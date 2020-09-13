class Task_04 {
    constructor(parent) {
        this.parent = document.querySelector('.circle__container');
    }

    init() {
        let text = {
            active: 'Run',
            pause: 'Stop'
        }

        let btn = document.querySelector('#task-04-btn');
        console.log(this.parent);
        console.log(document.querySelector('.circle__container'));
        btn.addEventListener('click', () => {
            console.log(btn)
            if (this.parent.classList.contains('paused')) {
                this.parent.classList.remove('paused');
                btn.textContent = text.pause;

                return;
            }

            this.parent.classList.add('paused');
            btn.textContent = text.active;
        }
        )
    }
}


let task_04 = new Task_04();
export default task_04;