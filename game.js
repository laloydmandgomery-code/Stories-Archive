/* =====================================================
   ИСТОРИИ АРХИВА
   GAME ENGINE
   ===================================================== */


/* =====================================================
   СОСТОЯНИЕ ИГРЫ
   ===================================================== */

const SAVE_KEY = "stories_archive_save_v1";

let game = {
    player: {
        name: "",
        items: []
    },

    currentLocation: "central",

    visitedLocations: [],

    flags: {},

    currentStory: null,

    storyProgress: {},

    customStories: [],

    npcSeen: false,

    secretSongSeen: false
};


/* =====================================================
   ПРЕДМЕТЫ
   ===================================================== */

const items = {
    book: {
        name: "📖 Книга Первой Двери",
        description:
            "Странная книга, которая может помочь разобраться со сложным выбором."
    },

    deepstone: {
        name: "💎 Deepstone",
        description:
            "Редкий загадочный артефакт. Иногда помогает в трудный момент."
    },

    heart: {
        name: "❤️ Сердце Архива",
        description:
            "Странный магический объект, связанный с древним посохом."
    },

    door: {
        name: "🚪 Дверь Неизвестности",
        description:
            "Таинственный артефакт, способный помочь исправить сюжетную проблему."
    },

    key: {
        name: "🗝️ Старый ключ",
        description:
            "Ключ неизвестного происхождения."
    },

    lantern: {
        name: "🏮 Старая лампа",
        description:
            "Помогает увидеть то, что скрыто во тьме."
    },

    note: {
        name: "📜 Загадочная записка",
        description:
            "На ней написано несколько непонятных символов."
    }
};


/* =====================================================
   ЛОКАЦИИ
   ===================================================== */

const locations = {

    central: {
        name: "Центральная площадь",
        icon: "🏛️",

        text:
            "Старая площадь Архива. Отсюда дороги ведут " +
            "в разные части неизвестного мира.",

        connections: [
            "forest",
            "library",
            "house"
        ]
    },

    forest: {
        name: "Туманный лес",
        icon: "🌲",

        text:
            "Деревья окружают тебя со всех сторон. " +
            "В глубине леса иногда появляется странный свет.",

        connections: [
            "central",
            "ruins"
        ]
    },

    library: {
        name: "Забытая библиотека",
        icon: "📚",

        text:
            "Тысячи книг стоят на полках. Некоторые из них " +
            "будто бы переставляются сами.",

        connections: [
            "central",
            "house"
        ]
    },

    house: {
        name: "Старый дом",
        icon: "🏚️",

        text:
            "Дом выглядит заброшенным. Но одно окно всё ещё светится. " +
            "Иногда кажется, что за стеклом кто-то стоит.",

        connections: [
            "central",
            "library"
        ]
    },

    ruins: {
        name: "Древние руины",
        icon: "🏚️",

        text:
            "Каменные стены почти полностью поглощены лесом. " +
            "Здесь чувствуется очень старая магия.",

        connections: [
            "forest"
        ]
    }
};


/* =====================================================
   ГОТОВЫЕ ИСТОРИИ
   ===================================================== */

const stories = [

    {
        id: "old_house",

        title: "🏚️ Тайна старого дома",

        description:
            "Странный дом появляется там, где его раньше не было.",

        start: "start",

        nodes: {

            start: {
                text:
                    "Ты стоишь перед старым домом. " +
                    "Одинокое окно светится в темноте. " +
                    "Дверь слегка приоткрыта.",

                choices: [
                    {
                        text: "Войти в дом",
                        next: "hall"
                    },

                    {
                        text: "Осмотреть окно",
                        next: "window"
                    },

                    {
                        text: "Уйти",
                        next: "leave"
                    }
                ]
            },

            hall: {
                text:
                    "Внутри тихо. На стене висит старый портрет. " +
                    "Тебе кажется, что взгляд изображённого человека " +
                    "следит за тобой.",

                choices: [
                    {
                        text: "Подойти к портрету",
                        next: "portrait"
                    },

                    {
                        text: "Подняться наверх",
                        next: "upstairs"
                    }
                ]
            },

            window: {
                text:
                    "Ты смотришь в окно. За стеклом появляется " +
                    "бледный силуэт. Через секунду он исчезает.",

                choices: [
                    {
                        text: "Войти в дом",
                        next: "hall"
                    },

                    {
                        text: "Отойти от окна",
                        next: "leave"
                    }
                ]
            },

            portrait: {
                text:
                    "За портретом ты обнаруживаешь маленький ключ.",

                choices: [
                    {
                        text: "Взять ключ",
                        next: "key_found",
                        item: "key"
                    },

                    {
                        text: "Оставить ключ",
                        next: "upstairs"
                    }
                ]
            },

            key_found: {
                text:
                    "Ты забираешь ключ. На обратной стороне " +
                    "портрета появляется надпись: «Не каждая дверь " +
                    "ведёт туда, куда ты ожидаешь».",

                choices: [
                    {
                        text: "Подняться наверх",
                        next: "upstairs"
                    }
                ]
            },

            upstairs: {
                text:
                    "На втором этаже находятся три двери. " +
                    "За одной слышится тихий стук.",

                choices: [
                    {
                        text: "Открыть дверь со стуком",
                        next: "room"
                    },

                    {
                        text: "Вернуться вниз",
                        next: "hall"
                    }
                ]
            },

            room: {
                text:
                    "Комната пуста. В центре стоит зеркало. " +
                    "В отражении ты видишь не комнату, а незнакомый лес.",

                choices: [
                    {
                        text: "Коснуться зеркала",
                        next: "mirror"
                    },

                    {
                        text: "Закрыть дверь",
                        next: "end_safe"
                    }
                ]
            },

            mirror: {
                text:
                    "Зеркало становится холодным. Перед тобой появляется " +
                    "дорога, ведущая куда-то далеко за пределы дома.",

                choices: [
                    {
                        text: "Сделать шаг в зеркало",
                        next: "end_mystery"
                    },

                    {
                        text: "Остаться в доме",
                        next: "end_safe"
                    }
                ]
            },

            leave: {
                ending: true,

                text:
                    "Ты уходишь от дома. Но когда оборачиваешься, " +
                    "в окне снова появляется силуэт.",

                choices: []
            },

            end_safe: {
                ending: true,

                text:
                    "Ты решаешь не рисковать. Дверь закрывается сама. " +
                    "Но ты понимаешь: тайна дома ещё не раскрыта.",

                choices: []
            },

            end_mystery: {
                ending: true,

                text:
                    "Ты делаешь шаг вперёд и оказываешься в неизвестном месте. " +
                    "Похоже, история старого дома была только началом.",

                choices: []
            }
        }
    },


    {
        id: "first_door",

        title: "📖 Книга Первой Двери",

        description:
            "В библиотеке появляется книга, которой не было раньше.",

        start: "start",

        nodes: {

            start: {
                text:
                    "На пыльной полке ты находишь книгу без названия. " +
                    "Когда ты открываешь её, первая страница оказывается пустой.",

                choices: [
                    {
                        text: "Продолжить чтение",
                        next: "reading"
                    },

                    {
                        text: "Закрыть книгу",
                        next: "leave"
                    }
                ]
            },

            reading: {
                text:
                    "На странице появляются слова: «Выбор уже сделан, " +
                    "но ты ещё можешь изменить его».",

                choices: [
                    {
                        text: "Спросить книгу о будущем",
                        next: "future",
                        item: "book"
                    },

                    {
                        text: "Закрыть книгу",
                        next: "leave"
                    }
                ]
            },

            future: {
                text:
                    "Книга показывает тебе несколько возможных дорог. " +
                    "Но ни одна из них не подписана.",

                choices: [
                    {
                        text: "Выбрать первую дорогу",
                        next: "end_one"
                    },

                    {
                        text: "Выбрать вторую дорогу",
                        next: "end_two"
                    }
                ]
            },

            leave: {
                ending: true,

                text:
                    "Ты закрываешь книгу. Когда снова смотришь на полку, " +
                    "её уже нет.",

                choices: []
            },

            end_one: {
                ending: true,

                text:
                    "Первая дорога приводит тебя к новым тайнам Архива.",

                choices: []
            },

            end_two: {
                ending: true,

                text:
                    "Вторая дорога приводит тебя туда, где начинается " +
                    "совсем другая история.",

                choices: []
            }
        }
    },


    {
        id: "unknown_door",

        title: "🚪 Дверь Неизвестности",

        description:
            "Иногда исправить историю можно только войдя в неё.",

        start: "start",

        nodes: {

            start: {
                text:
                    "В стене Архива появляется дверь, которой раньше не было.",

                choices: [
                    {
                        text: "Открыть дверь",
                        next: "inside"
                    },

                    {
                        text: "Оставить её закрытой",
                        next: "end"
                    }
                ]
            },

            inside: {
                text:
                    "За дверью находится место, которого не должно существовать. " +
                    "Перед тобой стоит незаконченная история.",

                choices: [
                    {
                        text: "Исправить историю",
                        next: "repair",
                        item: "door"
                    },

                    {
                        text: "Вернуться",
                        next: "end"
                    }
                ]
            },

            repair: {
                text:
                    "Ты исправляешь одну маленькую деталь. Мир вокруг тебя " +
                    "становится стабильнее.",

                choices: [
                    {
                        text: "Закончить",
                        next: "ending"
                    }
                ]
            },

            end: {
                ending: true,

                text:
                    "Ты решаешь не вмешиваться. Дверь исчезает.",

                choices: []
            },

            ending: {
                ending: true,

                text:
                    "История исправлена. Но ты понимаешь: где-то существует " +
                    "ещё множество незаконченных историй.",

                choices: []
            }
        }
    }
];


/* =====================================================
   БАЗОВЫЕ ФУНКЦИИ
   ===================================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(function(screen) {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }
}


function showMessage(text) {

    closeEvent();

    const box = document.getElementById("message");
    const textBox = document.getElementById("messageText");

    if (!box || !textBox) {
        return;
    }

    textBox.textContent = text;
    box.classList.remove("hidden");
}


function closeMessage() {

    const box = document.getElementById("message");

    if (box) {
        box.classList.add("hidden");
    }
}


/* =====================================================
   СОБЫТИЯ
   ===================================================== */

function showEvent(title, text, choices = [], icon = "◈") {

    closeMessage();

    const box = document.getElementById("eventBox");
    const titleBox = document.getElementById("eventTitle");
    const textBox = document.getElementById("eventText");
    const iconBox = document.getElementById("eventIcon");
    const choicesBox = document.getElementById("eventChoices");
    const continueButton = document.getElementById("eventContinue");

    if (!box || !titleBox || !textBox) {
        return;
    }

    titleBox.textContent = title;
    textBox.textContent = text;
    iconBox.textContent = icon;

    choicesBox.innerHTML = "";

    if (choices.length > 0) {

        continueButton.style.display = "none";

        choices.forEach(function(choice) {

            const button =
                document.createElement("button");

            button.textContent = choice.text;

            button.onclick = function() {

                handleChoice(choice);

            };

            choicesBox.appendChild(button);

        });

    } else {

        continueButton.style.display = "inline-block";

    }

    box.classList.remove("hidden");
}


function closeEvent() {

    const box = document.getElementById("eventBox");

    if (box) {
        box.classList.add("hidden");
    }
}


/* =====================================================
   ВЫБОРЫ
   ===================================================== */

function handleChoice(choice) {

    if (choice.item) {
        addItem(choice.item);
    }

    if (choice.flag) {
        game.flags[choice.flag] = true;
    }

    if (choice.location) {
        game.currentLocation = choice.location;
    }

    if (choice.action) {
        choice.action();
    }

    if (
        game.currentStory &&
        choice.next
    ) {

        continueStory(choice.next);

        return;
    }

    closeEvent();

    saveGame();
}


/* =====================================================
   ПЕРСОНАЖ
   ===================================================== */

function startGame() {

    showScreen("character");

}


function createCharacter() {

    const input =
        document.getElementById("playerName");

    const name =
        input.value.trim();

    if (!name) {

        showMessage(
            "Сначала придумай имя персонажа."
        );

        return;
    }

    game.player.name = name;

    game.player.items = [];

    saveGame();

    startFreeMode();

}


/* =====================================================
   СВОБОДНЫЙ РЕЖИМ
   ===================================================== */

function startFreeMode() {

    if (!game.player.name) {

        showScreen("character");

        return;
    }

    showScreen("freeMode");

    updatePlayerDisplay();
    updateLocation();
    renderLocations();

}


function updatePlayerDisplay() {

    const display =
        document.getElementById("playerDisplay");

    if (display) {

        display.textContent =
            "👤 " +
            (game.player.name || "Игрок");

    }
}


function updateLocation() {

    const location =
        locations[game.currentLocation];

    if (!location) {
        return;
    }

    const name =
        document.getElementById("locationName");

    const text =
        document.getElementById("worldText");

    const current =
        document.getElementById("currentLocation");

    if (name) {
        name.textContent =
            location.icon + " " + location.name;
    }

    if (text) {
        text.textContent =
            location.text;
    }

    if (current) {
        current.textContent =
            "📍 " + location.name;
    }
}


function renderLocations() {

    const container =
        document.getElementById("locations");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const location =
        locations[game.currentLocation];

    if (!location) {
        return;
    }

    location.connections.forEach(function(id) {

        const target =
            locations[id];

        if (!target) {
            return;
        }

        const button =
            document.createElement("button");

        button.textContent =
            target.icon + " " + target.name;

        button.onclick = function() {

            moveToLocation(id);

        };

        container.appendChild(button);

    });
}


function moveToLocation(id) {

    if (!locations[id]) {
        return;
    }

    game.currentLocation = id;

    if (!game.visitedLocations.includes(id)) {

        game.visitedLocations.push(id);

    }

    updateLocation();
    renderLocations();

    saveGame();

    triggerLocationEvent(id);

}


function exploreWorld() {

    const id =
        game.currentLocation;

    triggerLocationEvent(id);

}


function waitForEvent() {

    randomWorldEvent();

}


/* =====================================================
   СОБЫТИЯ ЛОКАЦИЙ
   ===================================================== */

function triggerLocationEvent(id) {

    if (id === "central") {

        showEvent(
            "Центральная площадь",
            "На площади тихо. Вдали слышится звук закрывающейся двери.",
            [
                {
                    text: "Пойти на звук",
                    nextAction: "house"
                },
                {
                    text: "Остаться на площади",
                    nextAction: "central"
                }
            ],
            "🏛️"
        );

        return;
    }


    if (id === "forest") {

        forestEvent();

        return;
    }


    if (id === "library") {

        libraryEvent();

        return;
    }


    if (id === "house") {

        houseEvent();

        return;
    }


    if (id === "ruins") {

        ruinsEvent();

        return;
    }

}


/* =====================================================
   С
