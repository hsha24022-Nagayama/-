document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const letterModal = document.getElementById('letter-modal');
    const collectionModal = document.getElementById('collection-modal');
    const bottleModal = document.getElementById('bottle-modal');
    let letterHistory = [];

    setTimeout(() => {
        prologue.style.opacity = '0';
        setTimeout(() => {
            prologue.classList.add('hidden');
            mainOcean.classList.remove('hidden');
            mainOcean.style.opacity = '1';
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
            document.getElementById('letter-text').innerText = msg;
            letterModal.classList.remove('hidden');
            letterHistory.push({ date: new Date().toLocaleString(), thought: val, message: msg });
            fish.remove();
        }, 5000);
    };

    document.getElementById('close-letter').onclick = () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = '1';
        userThought.value = "";
    };

    setInterval(() => {
        if (mainOcean.classList.contains('hidden')) return;
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
            bottle.remove();
        };
        document.getElementById('bottle-zone').appendChild(bottle);
        setTimeout(() => { if(bottle) bottle.remove(); }, 25000);
    }, 15000);

    document.getElementById('close-bottle').onclick = () => bottleModal.classList.add('hidden');

    document.getElementById('collection-btn').onclick = () => {
        const list = document.getElementById('collection-list');
        list.innerHTML = letterHistory.length ? '' : '<p style="text-align:center; margin-top:50px;">まだ手紙は届いていません。</p>';
        letterHistory.forEach(item => {
            const d = document.createElement('div');
            d.className = 'collection-item';
            d.innerHTML = `
                <small>${item.date}</small>
                <b>「${item.thought}」</b>
                <p>${item.message}</p>
            `;
            list.appendChild(d);
        });
        collectionModal.classList.remove('hidden');
    };
    document.getElementById('close-collection').onclick = () => collectionModal.classList.add('hidden');
});