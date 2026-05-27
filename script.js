document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const mainOcean = document.getElementById('main-ocean');
    const sendBtn = document.getElementById('send-btn');
    const userThought = document.getElementById('user-thought');
    const fishZone = document.getElementById('fish-delivery-zone');
    const letterModal = document.getElementById('letter-modal');
    const letterText = document.getElementById('letter-text');
    const closeLetter = document.getElementById('close-letter');
    
    // 図鑑関連の要素
    const collectionBtn = document.getElementById('collection-btn');
    const collectionModal = document.getElementById('collection-modal');
    const collectionList = document.getElementById('collection-list');
    const closeCollection = document.getElementById('close-collection');

    // 手紙の履歴を保存する配列
    let letterHistory = [];

    // 1. 導入演出
    setTimeout(() => {
        prologue.classList.add('hidden');
        mainOcean.classList.remove('hidden');
        mainOcean.style.opacity = 1;
    }, 4000);

    const normalMessages = [
        "クラゲは流れに身をまかせて生きています。あらがわない強さもあるかもしれません。",
        "深海の暗闇は、星空に似ています。あなたの孤独も、誰かにとっては光に見えるはず。",
        "水圧は、あなたを潰すものではなく、包み込む優しさだと思って。今はゆっくり休んで。"
    ];

    const specialKeyword = "消えたい";
    const specialMessage = "……よく、ここまで潜ってきてくれましたね。あなたは独りではありません。この深い海の底で、光はずっとあなたを待っています。";

    // 2. 送信イベント
    sendBtn.addEventListener('click', () => {
        const thought = userThought.value;
        if (!thought) return;

        document.getElementById('ui-container').style.opacity = 0.2;
        
        const fish = document.createElement('div');
        fish.className = 'fish approaching';
        fish.style.top = '50%';
        fish.style.left = '50%';
        fishZone.appendChild(fish);

        setTimeout(() => {
            let msg = "";
            if (thought.includes(specialKeyword)) {
                msg = specialMessage;
                fish.style.boxShadow = "0 0 40px #fff";
            } else {
                msg = normalMessages[Math.floor(Math.random() * normalMessages.length)];
            }
            
            // 手紙を表示
            letterText.innerText = msg;
            letterModal.classList.remove('hidden');
            letterModal.style.opacity = 1;
            
            // 履歴に保存
            const record = {
                date: new Date().toLocaleString(),
                thought: thought,
                message: msg
            };
            letterHistory.push(record);
            
            fish.remove();
        }, 5000);
    });

    // 3. 手紙を閉じる
    closeLetter.addEventListener('click', () => {
        letterModal.classList.add('hidden');
        document.getElementById('ui-container').style.opacity = 1;
        userThought.value = "";
        
        // 背景に魚を泳がせる
        const swimmingFish = document.createElement('div');
        swimmingFish.className = 'fish';
        swimmingFish.style.top = Math.random() * 80 + '%';
        swimmingFish.style.left = Math.random() * 80 + '%';
        swimmingFish.style.opacity = 0.4;
        mainOcean.appendChild(swimmingFish);
    });

    // 4. 図鑑を開く
    collectionBtn.addEventListener('click', () => {
        // リストをクリアして再生成
        collectionList.innerHTML = '';
        
        if (letterHistory.length === 0) {
            collectionList.innerHTML = '<p>まだ手紙は届いていません。</p>';
        } else {
            letterHistory.forEach(item => {
                const div = document.createElement('div');
                div.className = 'collection-item';
                div.innerHTML = `
                    <div class="collection-date">${item.date}</div>
                    <div class="collection-thought">「${item.thought}」への返信</div>
                    <div class="collection-message">${item.message}</div>
                `;
                collectionList.appendChild(div);
            });
        }
        
        collectionModal.classList.remove('hidden');
        collectionModal.style.opacity = 1;
    });

    // 5. 図鑑を閉じる
    closeCollection.addEventListener('click', () => {
        collectionModal.classList.add('hidden');
    });
});
// --- script.js の末尾付近、または適切な場所に追加 ---

const bottleZone = document.getElementById('bottle-zone');
const bottleModal = document.getElementById('bottle-modal');
const bottleThought = document.getElementById('bottle-thought');
const bottleMessage = document.getElementById('bottle-message');
const closeBottle = document.getElementById('close-bottle');

// 他の誰かの悩みと返信のサンプル（本来はサーバーから取得するイメージ）
const driftSamples = [
    { thought: "明日が来るのが少し怖いな", message: "夜の海も、月明かりがあれば歩けます。あなたの明日にも、小さな光が差しますように。" },
    { thought: "自分の居場所がない気がする", message: "海には境界線がありません。どこへ行っても、そこはあなたの海ですよ。" },
    { thought: "何もできていない自分に焦る", message: "波は寄せては返すだけ。それでも、砂浜を少しずつ形作っています。あなたも、生きているだけで十分です。" }
];

// 瓶を生成して流す関数
function spawnBottle() {
    const bottle = document.createElement('div');
    bottle.className = 'bottle drifting';
    bottle.style.top = Math.random() * 60 + 20 + '%'; // 画面中央付近を流す
    
    bottle.onclick = () => {
        const sample = driftSamples[Math.floor(Math.random() * driftSamples.length)];
        bottleThought.innerText = `「${sample.thought}」`;
        bottleMessage.innerText = sample.message;
        bottleModal.classList.remove('hidden');
        bottleModal.style.opacity = 1;
        bottle.remove(); // 拾ったら消える
    };

    bottleZone.appendChild(bottle);

    // 画面外に出たら消す
    setTimeout(() => { if(bottle) bottle.remove(); }, 25000);
}

// 30秒に1回、瓶を流すか判定
setInterval(() => {
    if (Math.random() > 0.6) { // 30%の確率で流れる
        spawnBottle();
    }
}, 10000);

closeBottle.onclick = () => {
    bottleModal.classList.add('hidden');
};