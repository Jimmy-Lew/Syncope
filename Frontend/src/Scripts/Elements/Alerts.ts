import { delay } from '../Utils';

let id = 0;

class Alert {
    id: number;
    message: string;
    duration: number;
    callback: () => void;
    returnValue: string | number | boolean | null;

    constructor(message: string, duration: number, callback = () : void => {}) {
        this.message = message;

        this.duration = duration * 1000;

        this.id = ++id;
        this.callback = callback;

        this.returnValue = null;
    }

    async show() : Promise<void> {
        $("#alertCentre").prepend(`

            <div class="notif" id="${this.id}">
                <div class="icon"></div>
                <div class="message">${this.message}</div>
            </div>

        `)

        // Closes after fixed time

        if (this.duration > 0) {
            setTimeout(() => {this.hide(); this.callback()}, this.duration);
        }

        // Closes after user interaction

        else {
            // @ts-ignore
            $(document).on("keyup", (event: KeyboardEvent) => {
                if (event.key === "Enter") this.hide();
            })

            // @ts-ignore
            $(`.notif#${this.id}`).on("click", (event: MouseEvent) => this.hide())

            while (this.returnValue == null) await delay(1)
            this.hide();
        }
    }

    hide() : void {
        $(`.notif#${this.id}`).remove();
        // console.log(`Removed alert ${this.id}`);
    }
}
/**
 * 
 * @param message Message for notifcation to display
 * @param duration Duration notifcation lasts, put 0 for persisting notification
 * @param closeCallback Callback function on close
 */
export async function addAlert(
    message: string,
    duration: number,
    closeCallback?: () => void
) : Promise<void> {
    new Alert(
        message,
        duration,
        closeCallback
    ).show()
}