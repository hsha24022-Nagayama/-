document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const letterModal = document.getElementById('letter-modal');
    const collectionModal = document.getElementById('collection-modal');
    const bottleModal = document.getElementById('bottle-modal');
    let letterHistory = [];

    // 導入演出
    setTimeout(() => {
        prologue.style.opacity = '0';
        setTimeout(() => {
            prologue.classList.add('hidden');
            mainOcean.classList.remove('hidden');
            mainOcean.style.opacity = '1';
        }, 1000);
    }, 4000);

    // 自分の手紙を送る
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
            document.getElementById('letter-text').innerText = msg;
            letterModal.classList.remove('hidden');
            
            // 自分の記録として保存
            letterHistory.push({ 
                type: 'mine',
                date: new Date().toLocaleString(), 
                thought: val, 
                message: msg 
            });
            fish.remove();
        }, 5000);
    };

    document.getElementById('close-letter').onclick = () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = '1';
        userThought.value = "";
    };

    // 瓶を流す関数
    function spawnBottle() {
        if (mainOcean.classList.contains('hidden')) {
            setTimeout(spawnBottle, 10000);
            return;
        }

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

            // 【追加】拾った瓶も記録に保存
            letterHistory.push({ 
                type: 'bottle',
                date: new Date().toLocaleString(), 
                thought: s.t, 
                message: s.m 
            });

            bottle.remove();
        };

        document.getElementById('bottle-zone').appendChild(bottle);
        setTimeout(() => { if(bottle) bottle.remove(); }, 25000);

        const nextTime = Math.random() * 30000 + 40000; // 40〜70秒おき
        setTimeout(spawnBottle, nextTime);
    }

    setTimeout(spawnBottle, 20000);

    document.getElementById('close-bottle').onclick = () => bottleModal.classList.add('hidden');

    // 図鑑の表示
    document.getElementById('collection-btn').onclick = () => {
        const list = document.getElementById('collection-list');
        list.innerHTML = letterHistory.length ? '' : '<p style="text-align:center; margin-top:50px;">まだ手紙は届いていません。</p>';
        
        letterHistory.forEach(item => {
            const d = document.createElement('div');
            // 自分の手紙か、拾った瓶かで見た目を変える
            d.className = item.type === 'bottle' ? 'collection-item bottle-item' : 'collection-item';
            
            const label = item.type === 'bottle' ? '<small>🌊 海からの拾いもの</small>' : `<small>✉️ ${item.date}</small>`;
            
            d.innerHTML = `
                ${label}
                <b>「${item.thought}」</b>
                <p>${item.message}</p>
            `;
            list.appendChild(d);
        });
        collectionModal.classList.remove('hidden');
    };
    document.getElementById('close-collection').onclick = () => collectionModal.classList.add('hidden');
});