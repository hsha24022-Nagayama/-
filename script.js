document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const fishZone = document.getElementById('fish-delivery-zone');
    const letterModal = document.getElementById('letter-modal');
    const letterText = document.getElementById('letter-text');
    const collectionModal = document.getElementById('collection-modal');
    const collectionList = document.getElementById('collection-list');
    const bottleModal = document.getElementById('bottle-modal');

    let letterHistory = [];

    // 1. 導入演出 (4秒)
    setTimeout(() => {
        prologue.style.opacity = '0';
        setTimeout(() => {
            prologue.classList.add('hidden');
            mainOcean.classList.remove('hidden');
            mainOcean.style.opacity = '1';
        }, 1000);
    }, 4000);

    // 2. メッセージデータ
    const normalMessages = [
        "深海の暗闇は、星空に似ています。あなたの孤独も、誰かにとっては光に見えるはず。",
        "水圧は、あなたを潰すものではなく、包み込む優しさだと思って。今はゆっくり休んで。",
        "クラゲは流れに身をまかせて生きています。あらがわない強さも、一つの勇気です。"
    ];

    const driftSamples = [
        { thought: "明日が少し怖いな", message: "夜の海も、月明かりがあれば歩けます。小さな光を信じて。" },
        { thought: "居場所がない気がする", message: "海には境界線がありません。どこへ行っても、そこはあなたの海です。" }
    ];

    // 3. 手紙を送る
    sendBtn.onclick = () => {
        const thought = userThought.value;
        if (!thought) return;

        document.getElementById('ui-container').style.opacity = '0.2';
        const fish = document.createElement('div');
        fish.className = 'fish approaching';
        fish.style.top = '50%'; fish.style.left = '50%';
        fishZone.appendChild(fish);

        setTimeout(() => {
            let msg = thought.includes("消えたい") ? "よくここまで潜ってきてくれました。独りではありませんよ。" : normalMessages[Math.floor(Math.random() * normalMessages.length)];
            letterText.innerText = msg;
            letterModal.classList.remove('hidden');
            letterModal.style.opacity = '1';
            letterHistory.push({ date: new Date().toLocaleString(), thought: thought, message: msg });
            fish.remove();
        }, 5000);
    };

    // 4. モーダルを閉じる
    document.getElementById('close-letter').onclick = () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = '1';
        userThought.value = "";
    };

    // 5. 漂流瓶を流す (15秒に1回判定)
    setInterval(() => {
        if (mainOcean.classList.contains('hidden')) return;
        
        const bottle = document.createElement('div');
        bottle.className = 'bottle drifting';
        bottle.style.top = (Math.random() * 60 + 20) + '%';
        
        bottle.onclick = () => {
            const s = driftSamples[Math.floor(Math.random() * driftSamples.length)];
            document.getElementById('bottle-thought').innerText = `「${s.thought}」`;
            document.getElementById('bottle-message').innerText = s.message;
            bottleModal.classList.remove('hidden');
            bottleModal.style.opacity = '1';
            bottle.remove();
        };
        document.getElementById('bottle-zone').appendChild(bottle);
        setTimeout(() => bottle.remove(), 15000);
    }, 15000);

    document.getElementById('close-bottle').onclick = () => bottleModal.classList.add('hidden');

    // 6. 図鑑
    document.getElementById('collection-btn').onclick = () => {
        collectionList.innerHTML = letterHistory.length ? '' : '<p>まだ手紙はありません。</p>';
        letterHistory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'collection-item';
            div.innerHTML = `<small>${item.date}</small><br><b>「${item.thought}」</b><br>${item.message}`;
            collectionList.appendChild(div);
        });
        collectionModal.classList.remove('hidden');
        collectionModal.style.opacity = '1';
    };
    document.getElementById('close-collection').onclick = () => collectionModal.classList.add('hidden');
});