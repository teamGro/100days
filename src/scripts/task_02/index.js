class Task_02 {
    constructor(top, middle, bottom) {
        this.topElem = document.querySelector('.elem__top');
        this.middleElem = document.querySelector('.elem__middle');
        this.bottomElem = document.querySelector('.elem__bottom');
    }

    init() {
        let elem = document.querySelector('.task');
        elem.addEventListener('click', () => {
            if (this.topElem.classList.contains('elem__top--active') ||
                this.bottomElem.classList.contains('elem__bottom--active')) {

                this.topElem.classList.remove('elem__top--active');
                this.topElem.classList.add('elem__top--disactive');

                this.middleElem.classList.remove('elem__middle--active');
                this.middleElem.classList.add('elem__middle--disactive');

                this.bottomElem.classList.remove('elem__bottom--active');
                this.bottomElem.classList.add('elem__bottom--disactive');

                return;
            }
            this.topElem.classList.add('elem__top--active');
            this.topElem.classList.remove('elem__top--disactive');

            this.middleElem.classList.add('elem__middle--active');
            this.middleElem.classList.remove('elem__middle--disactive');

            this.bottomElem.classList.add('elem__bottom--active');
            this.bottomElem.classList.remove('elem__bottom--disactive');
        }
        )
    }
}


let task_02 = new Task_02();
export default task_02;
