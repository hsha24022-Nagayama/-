document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const fishZone = document.getElementById('fish-delivery-zone');
    const letterModal = document.getElementById('letter-modal');
    const letterText = document.getElementById('letter-text');
    const closeLetter = document.getElementById('close-letter');

    // 1. 導入演出：4秒後にメイン画面へ
    setTimeout(() => {
        prologue.classList.add('hidden');
        mainOcean.classList.remove('hidden');
        mainOcean.style.opacity = 1;
    }, 4000);

    // 2. メッセージデータベース
    const normalMessages = [
        "クラゲは流れに身をまかせて生きています。あらがわない強さもあるかもしれません。",
        "深海の暗闇は、星空に似ています。あなたの孤独も、誰かにとっては光に見えるはず。",
        "水圧は、あなたを潰すものではなく、包み込む優しさだと思って。今はゆっくり休んで。"
    ];

    const specialKeyword = "消えたい";
    const specialMessage = "……よく、ここまで潜ってきてくれましたね。あなたは独りではありません。この深い海の底で、光はずっとあなたを待っています。";

    // 3. 送信イベント
    sendBtn.addEventListener('click', () => {
        const text = userThought.value;
        if (!text) return;

        // UIを一時隠す
        document.getElementById('ui-container').style.opacity = 0.2;
        
        // 魚の登場演出
        const fish = document.createElement('div');
        fish.className = 'fish approaching';
        // 中央付近に出現させる
        fish.style.top = '50%';
        fish.style.left = '50%';
        fishZone.appendChild(fish);

        // 5秒後（魚が到着した頃）に手紙を表示
        setTimeout(() => {
            let msg = "";
            if (text.includes(specialKeyword)) {
                msg = specialMessage;
                fish.style.boxShadow = "0 0 40px #fff"; // 特別な光
            } else {
                msg = normalMessages[Math.floor(Math.random() * normalMessages.length)];
            }
            
            letterText.innerText = msg;
            letterModal.classList.remove('hidden');
            letterModal.style.opacity = 1;
            
            // 魚を消去
            fish.remove();
        }, 5000);
    });

    // 4. 手紙を閉じる
    closeLetter.addEventListener('click', () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = 1;
        userThought.value = "";
        
        // 背景に魚を残す（簡易的な実装）
        const swimmingFish = document.createElement('div');
        swimmingFish.className = 'fish';
        swimmingFish.style.top = Math.random() * 80 + '%';
        swimmingFish.style.left = Math.random() * 80 + '%';
        swimmingFish.style.opacity = 0.4;
        mainOcean.appendChild(swimmingFish);
    });
});