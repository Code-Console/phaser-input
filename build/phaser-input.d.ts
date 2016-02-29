declare module Fabrique {
    enum InputType {
        text = 0,
        password = 1,
        number = 2,
    }
    class InputElement {
        private element;
        private callback;
        private type;
        private id;
        constructor(id: string, type?: InputType, value?: string);
        addKeyUpListener(callback: () => void): void;
        removeEventListener(): void;
        destroy(): void;
        setMax(max: string, min?: string): void;
        value: string;
        focus(): void;
        getCaretPosition(): number;
    }
}
declare module Fabrique {
    interface InputOptions extends Phaser.PhaserTextStyle {
        x?: number;
        y?: number;
        placeHolder?: string;
        fillAlpha?: number;
        width?: number;
        height?: number;
        padding?: number;
        borderWidth?: number;
        borderColor?: string;
        borderRadius?: number;
        cursorColor?: string;
        placeHolderColor?: string;
        type?: InputType;
        min?: string;
        max?: string;
        textAlign?: string;
    }
    class InputField extends Phaser.Sprite {
        private placeHolder;
        private box;
        private textMask;
        private focus;
        private cursor;
        private text;
        private offscreenText;
        value: string;
        private inputOptions;
        private domElement;
        constructor(game: Phaser.Game, x: number, y: number, inputOptions?: InputOptions);
        private createTextMask();
        /**
         * Creates the nice box for the input field
         *
         * @param inputOptions
         */
        private createBox();
        /**
         * This is a generic input down handler for the game.
         * if the input object is clicked, we gain focus on it and create the dom element
         *
         * If there was focus on the element previously, but clicked outside of it, the element will loose focus
         * and no keyboard events will be registered anymore
         *
         * @param e Phaser.Pointer
         */
        private checkDown(e);
        /**
         * Creates a hidden input field, makes sure focus is added to it.
         * This is all to ensure mobile keyboard are also opened
         *
         * And last, but not least, we register an event handler
         */
        private createDomElement();
        /**
         * Update function makes the cursor blink, it uses two private properties to make it toggle
         *
         * @returns {number}
         */
        private blink;
        private cnt;
        update(): number;
        /**
         * Focus is lost on the input element, we disable the cursor and remove the hidden input element
         */
        private endFocus();
        private startFocus();
        /**
         * Update the text value in the box, and make sure the cursor is positioned correctly
         */
        private updateText();
        private updateCursor();
        private getCaretPosition();
        /**
         * Event fired when a key is pressed, it takes the value from the hidden input field and adds it as its own
         */
        private keyListener();
        /**
         * We overwrite the destroy method because we want to delete the (hidden) dom element when the inputField was removed
         */
        destroy(): void;
        /**
         * Resets the text to an empty value
         */
        resetText(): void;
    }
}
declare module Fabrique {
    module Plugins {
        interface InputFieldObjectFactory extends Phaser.GameObjectFactory {
            inputField: (x: number, y: number, inputOptions?: Fabrique.InputOptions, group?: Phaser.Group) => Fabrique.InputField;
        }
        interface InputFieldObjectCreator extends Phaser.GameObjectCreator {
            inputField: (x: number, y: number, inputOptions?: Fabrique.InputOptions) => Fabrique.InputField;
        }
        interface InputFieldGame extends Phaser.Game {
            add: InputFieldObjectFactory;
            make: InputFieldObjectCreator;
        }
        class InputField extends Phaser.Plugin {
            constructor(game: Phaser.Game, parent: PIXI.DisplayObject);
            /**
             * Extends the GameObjectFactory prototype with the support of adding InputField. this allows us to add InputField methods to the game just like any other object:
             * game.add.InputField();
             */
            private addInputFieldFactory();
        }
    }
}
