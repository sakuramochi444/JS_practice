/**
 * DOMコンテンツが完全に読み込まれた後に、すべてのインタラクティブなデモを初期化します。
 * このイベントリスナーにより、HTMLがすべて解析されてからJavaScriptが実行されるため、
 * 要素が見つからないというエラーを防ぎます。
 */
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu(); // ハンバーガーメニューのセットアップを最初に行う
    setupTextChangeDemo();
    setupStyleEditorDemo();
    setupTodoListDemo();
    setupImageFetchDemo();
    setupCanvasDemo();
    setupValidationDemo(); // 実践⑥
    setupQuizDemo();       // 実践⑦
    setupTimerDemo();      // 実践⑧
    setupModalDemo();      // 実践⑨
    setupCharCounterDemo();// 実践⑩
    setupImageGalleryDemo(); // 実践⑪
});

/**
 * ハンバーガーメニュー機能のセットアップ
 * クリックでメニューの表示/非表示を切り替えます。
 */
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const nav = document.getElementById('gnav');
    const navLinks = nav.querySelectorAll('a');
    const body = document.body;

    if (!hamburgerBtn || !nav) return;

    // メニューを開閉する関数
    const toggleMenu = () => {
        const isOpen = hamburgerBtn.classList.toggle('is-open');
        nav.classList.toggle('is-open');
        body.classList.toggle('is-menu-open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    };

    // ハンバーガーボタンのクリックイベント
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // イベントの伝播を停止
        toggleMenu();
    });

    // メニュー内のリンクがクリックされたらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // ドキュメントの他の部分をクリックしたらメニューを閉じる
    document.addEventListener('click', (e) => {
        // メニューが開いていて、クリックされたのがナビゲーションの外側の場合
        if (nav.classList.contains('is-open') && !nav.contains(e.target) && e.target !== hamburgerBtn) {
            toggleMenu();
        }
    });
}


/**
 * デモ①：テキスト変更機能のセットアップ
 * ボタンをクリックするたびに、用意されたメッセージを順番に表示します。
 */
function setupTextChangeDemo() {
    const textElement = document.getElementById('demo-text');
    const changeButton = document.getElementById('change-text-btn');
    
    if (!changeButton) return;

    const messages = [
        "こんにちは、世界！", 
        "JavaScriptは楽しい！", 
        "DOM操作を学びました！", 
        "クリックするたびに変わります"
    ];
    let messageIndex = 0;

    changeButton.addEventListener('click', () => {
        messageIndex = (messageIndex + 1) % messages.length;
        textElement.textContent = messages[messageIndex];
    });
}

/**
 * デモ②：スタイルエディター機能のセットアップ
 * ユーザーの入力に応じて、プレビューテキストのスタイル（内容、色、サイズ）をリアルタイムで変更します。
 */
function setupStyleEditorDemo() {
    const textInput = document.getElementById('text-input');
    const colorPicker = document.getElementById('color-picker');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const previewText = document.getElementById('style-preview-text');

    if (!textInput || !colorPicker || !sizeSlider || !sizeValue || !previewText) return;

    function updatePreview() {
        previewText.textContent = textInput.value;
        previewText.style.color = colorPicker.value;
        const newSize = sizeSlider.value;
        previewText.style.fontSize = `${newSize}px`;
        sizeValue.textContent = newSize;
    }

    textInput.addEventListener('input', updatePreview);
    colorPicker.addEventListener('input', updatePreview);
    sizeSlider.addEventListener('input', updatePreview);

    updatePreview();
}

/**
 * デモ③：To-Doリスト機能のセットアップ
 * 新しいタスクの追加と、既存タスクの削除機能を提供します。
 */
function setupTodoListDemo() {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    if (!addTodoBtn) return;

    function addTodo() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        const listItem = createTodoItem(taskText);
        todoList.appendChild(listItem);

        todoInput.value = '';
        todoInput.focus();
    }

    function createTodoItem(taskText) {
        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        return listItem;
    }

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
}

/**
 * デモ④：APIによる画像取得機能のセットアップ
 * 外部の画像生成サービスを利用して、入力されたキーワードの画像を動的に表示します。
 */
function setupImageFetchDemo() {
    const apiInput = document.getElementById('api-input');
    const fetchBtn = document.getElementById('fetch-image-btn');
    const imageContainer = document.getElementById('image-result-container');

    if (!fetchBtn) return;

    function fetchImage() {
        const keyword = apiInput.value.trim();
        if (keyword === '') return;

        imageContainer.innerHTML = '<p class="loading-message">画像を取得中...</p>';

        const newImage = document.createElement('img');
        
        newImage.onload = () => {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(newImage);
        };
        
        newImage.onerror = () => {
            imageContainer.innerHTML = '<p class="error-message">画像の取得に失敗しました。</p>';
        };

        newImage.src = `https://placehold.co/600x400/e0f7fa/00796b?text=${encodeURIComponent(keyword)}`;
        newImage.alt = keyword;
    }

    fetchBtn.addEventListener('click', fetchImage);
    apiInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            fetchImage();
        }
    });
}


/**
 * デモ⑤：Canvasお絵かき機能のセットアップ
 * マウスやタッチ操作で自由に線を描けるキャンバスを提供します。
 */
function setupCanvasDemo() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('pen-color');
    const clearButton = document.getElementById('clear-canvas-btn');

    const setCanvasSize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };

    setCanvasSize();

    let isDrawing = false;
    
    context.strokeStyle = colorPicker.value;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const getCoordinates = (event) => {
        if (event.touches && event.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            return {
                offsetX: event.touches[0].clientX - rect.left,
                offsetY: event.touches[0].clientY - rect.top
            };
        }
        return { offsetX: event.offsetX, offsetY: event.offsetY };
    };

    const startDrawing = (e) => {
        isDrawing = true;
        const { offsetX, offsetY } = getCoordinates(e);
        context.beginPath();
        context.moveTo(offsetX, offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const { offsetX, offsetY } = getCoordinates(e);
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    colorPicker.addEventListener('input', (e) => {
        context.strokeStyle = e.target.value;
    });

    clearButton.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    window.addEventListener('resize', () => {
        const currentImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setCanvasSize();
        context.putImageData(currentImageData, 0, 0);
        context.strokeStyle = colorPicker.value;
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
    });
}

/**
 * デモ⑥：フォームバリデーション機能のセットアップ
 */
function setupValidationDemo() {
    const form = document.getElementById('validation-form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const messageArea = document.getElementById('validation-message');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作をキャンセル

        const email = emailInput.value;
        const password = passwordInput.value;
        let errors = [];

        // メールアドレスのチェック（単純に@が含まれるか）
        if (!email.includes('@')) {
            errors.push('有効なメールアドレスを入力してください。');
        }

        // パスワードのチェック（8文字以上か）
        if (password.length < 8) {
            errors.push('パスワードは8文字以上で入力してください。');
        }

        if (errors.length > 0) {
            messageArea.textContent = errors.join(' ');
            messageArea.className = 'message-area error';
        } else {
            messageArea.textContent = '登録成功！';
            messageArea.className = 'message-area success';
        }
    });
}

/**
 * デモ⑦：クイズ機能のセットアップ
 */
function setupQuizDemo() {
    const checkBtn = document.getElementById('check-answer-btn');
    const resultArea = document.getElementById('quiz-result');
    const quizOptions = document.getElementById('quiz-options');

    if (!checkBtn) return;

    const correctAnswer = 'function';

    checkBtn.addEventListener('click', () => {
        const selectedOption = quizOptions.querySelector('input[name="quiz"]:checked');

        if (!selectedOption) {
            resultArea.textContent = '答えを選択してください。';
            resultArea.className = 'message-area error';
            return;
        }

        if (selectedOption.value === correctAnswer) {
            resultArea.textContent = '正解！「function」は関数を定義するキーワードです。';
            resultArea.className = 'message-area success';
        } else {
            resultArea.textContent = '不正解。もう一度考えてみましょう。';
            resultArea.className = 'message-area error';
        }
    });
}

/**
 * デモ⑧：カウントダウンタイマー機能のセットアップ
 */
function setupTimerDemo() {
    const display = document.getElementById('timer-display');
    const input = document.getElementById('timer-input');
    const startBtn = document.getElementById('start-timer-btn');
    const resetBtn = document.getElementById('reset-timer-btn');

    if (!startBtn) return;

    let timerInterval = null;
    let timeLeft = parseInt(input.value, 10);

    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        display.textContent = `${minutes}:${seconds}`;
    };

    const startTimer = () => {
        if (timerInterval) return; // すでにタイマーが動いていたら何もしない

        timeLeft = parseInt(input.value, 10);
        if (isNaN(timeLeft) || timeLeft <= 0) return;
        
        updateDisplay();
        startBtn.disabled = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                display.textContent = '終了！';
                startBtn.disabled = false;
            }
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = parseInt(input.value, 10);
        updateDisplay();
        startBtn.disabled = false;
    };

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    input.addEventListener('change', resetTimer);

    updateDisplay(); // 初期表示
}

/**
 * デモ⑨：モーダルウィンドウ機能のセットアップ
 */
function setupModalDemo() {
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    if (!openBtn) return;

    const openModal = () => {
        overlay.classList.add('is-visible');
        content.classList.add('is-visible');
    };

    const closeModal = () => {
        overlay.classList.remove('is-visible');
        content.classList.remove('is-visible');
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

/**
 * デモ⑩：文字数カウンター機能のセットアップ
 */
function setupCharCounterDemo() {
    const textarea = document.getElementById('comment-textarea');
    const counter = document.getElementById('char-counter');
    
    if (!textarea) return;

    const maxLength = textarea.maxLength;

    textarea.addEventListener('input', () => {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength} / ${maxLength}`;

        if (currentLength > maxLength) {
            counter.classList.add('is-over-limit');
        } else {
            counter.classList.remove('is-over-limit');
        }
    });
}

/**
 * デモ⑪：画像ギャラリー機能のセットアップ
 */
function setupImageGalleryDemo() {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    if (!mainImage || !thumbnailContainer) return;

    const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail-img');

    thumbnailContainer.addEventListener('click', (e) => {
        // クリックされたのがサムネイル画像か確認
        if (e.target.classList.contains('thumbnail-img')) {
            const clickedThumbnail = e.target;

            // メイン画像のsrcとaltを更新
            mainImage.src = clickedThumbnail.src;
            mainImage.alt = clickedThumbnail.alt;

            // activeクラスを付け替える
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            clickedThumbnail.classList.add('active');
        }
    });
}
