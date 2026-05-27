document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const letterModal = document.getElementById('letter-modal');
    const collectionModal = document.getElementById('collection-modal');
    const bottleModal = document.getElementById('bottle-modal');
    const bubbleContainer = document.getElementById('bubble-container');
    let letterHistory = [];

    const treasures = [
        { symbol: "🐚", name: "ささやき貝" }, { symbol: "✨", name: "星の砂" },
        { symbol: "💎", name: "瑠璃色の石" }, { symbol: "🪸", name: "黄金のサンゴ" },
        { symbol: "🌕", name: "真珠の涙" }, { symbol: "🪙", name: "古い銀貨" }
    ];

    // --- 【追加】泡を生成する関数 ---
    function createBubbles() {
        // 現在の記録数に合わせて泡を出す（1つの記録につき5つの泡）
        const bubbleCount = letterHistory.length * 5;
        // 一旦リセット（増えすぎ防止）
        bubbleContainer.innerHTML = '';
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 10 + 5 + 'px';
            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.setProperty('--t', (Math.random() * 5 + 5) + 's'); // 上昇速度
            bubble.style.setProperty('--o', Math.random() * 0.5 + 0.1); // 透明度
            bubble.style.animationDelay = Math.random() * 5 + 's';
            bubbleContainer.appendChild(bubble);
        }
    }

    setTimeout(() => {
        prologue.style.opacity = '0';
        setTimeout(() => {
            prologue.classList.add('hidden');
            mainOcean.classList.remove('hidden');
            mainOcean.style.opacity = '1';
            createBubbles(); // 初期表示
        }, 1000);
    }, 4000);

    sendBtn.onclick = () => {
        const val = userThought.value;
        if (!val) return;
        document.getElementById('ui-container').style.opacity = '0.2';
        const fish = document.createElement('div');
        fish.className = 'fish approaching';
        fish.style.top = '50%'; fish.style.left = '50%';
        document.getElementById('fish-delivery-zone').appendChild(fish);

        setTimeout(() => {
            const msg = val.includes("消えたい") ? "よくここまで潜ってきてくれましたね。あなたは独りではありませんよ。" : "深海の静寂は、あなたを優しく包む毛布のようなものです。今はゆっくり休んで。";
            const getTreasure = treasures[Math.floor(Math.random() * treasures.length)];
            document.getElementById('treasure-disp').innerHTML = `${getTreasure.symbol}<br><small style="font-size:0.8rem">贈り物：${getTreasure.name}</small>`;
            document.getElementById('letter-text').innerText = msg;
            letterModal.classList.remove('hidden');
            
            letterHistory.push({ type: 'mine', date: new Date().toLocaleString(), thought: val, message: msg, treasure: getTreasure.symbol });
            createBubbles(); // 記録が増えたので泡を増やす
            fish.remove();
        }, 5000);
    };

    document.getElementById('close-letter').onclick = () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = '1';
        userThought.value = "";
    };

    function spawnBottle() {
        if (mainOcean.classList.contains('hidden')) { setTimeout(spawnBottle, 10000); return; }
        const bottle = document.createElement('div');
        bottle.className = 'bottle drifting';
        const pulse = document.createElement('div');
        pulse.className = 'bottle-pulse';
        bottle.appendChild(pulse);
        bottle.style.top = (Math.random() * 60 + 20) + '%';
        
        bottle.onclick = (e) => {
            e.stopPropagation();
            const samples = [
                { t: "明日が来るのが少し怖い", m: "夜の海も、いつか朝の光を連れてきます。大丈夫ですよ。" },
                { t: "疲れちゃったな", m: "波に身をまかせて、ただ浮いているだけの時間があってもいいんです。" },
                { t: "誰もわかってくれない", m: "深海の生き物たちは、音もなく、でも確かに寄り添い合って生きています。" }
            ];
            const s = samples[Math.floor(Math.random() * samples.length)];
            document.getElementById('bottle-thought').innerText = `「${s.t}」`;
            document.getElementById('bottle-message').innerText = s.m;
            bottleModal.classList.remove('hidden');

            letterHistory.push({ type: 'bottle', date: new Date().toLocaleString(), thought: s.t, message: s.m, treasure: "🌊" });
            createBubbles(); // 泡を増やす
            bottle.remove();
        };
        document.getElementById('bottle-zone').appendChild(bottle);
        setTimeout(() => { if(bottle) bottle.remove(); }, 25000);
        const nextTime = Math.random() * 30000 + 40000;
        setTimeout(spawnBottle, nextTime);
    }
    setTimeout(spawnBottle, 20000);

    document.getElementById('close-bottle').onclick = () => bottleModal.classList.add('hidden');

    document.getElementById('collection-btn').onclick = () => {
        const list = document.getElementById('collection-list');
        list.innerHTML = letterHistory.length ? '' : '<p style="text-align:center; margin-top:50px;">まだ手紙は届いていません。</p>';
        letterHistory.forEach(item => {
            const d = document.createElement('div');
            d.className = item.type === 'bottle' ? 'collection-item bottle-item' : 'collection-item';
            const label = item.type === 'bottle' ? '<small>海からの拾いもの</small>' : `<small>${item.date}</small>`;
            const treasureTag = item.treasure ? `<div class="item-treasure">${item.treasure}</div>` : '';
            d.innerHTML = `${treasureTag}${label}<b>「${item.thought}」</b><p>${item.message}</p>`;
            list.appendChild(d);
        });
        collectionModal.classList.remove('hidden');
    };
    document.getElementById('close-collection').onclick = () => collectionModal.classList.add('hidden');
});