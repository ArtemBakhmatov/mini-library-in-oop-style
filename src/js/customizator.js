class Customizator {
    constructor() {
        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');
        this.btnBlock.addEventListener('click', (event) => this.onScaleChange(event));
        this.colorPicker.addEventListener('input', (event) => this.onColorChange(event));
    }

    onScaleChange(event) {
        let scale;
        const body = document.querySelector('body');
        if(event.target.value) {
            scale = +event.target.value.replace(/x/g, ''); // x -> заменяем на пустую строку
        }

        function recursy(element) {
            element.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) { 
                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''))
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                        // +value.replace(/px/g, '') -> 50px получиться 50 и он будет числовым типом данных
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                    }
                    
                } else {
                    recursy(node);
                }
                // node.nodeName === '#text' -> текстовые узлы
                // node.nodeValue.replace(/\s+/g, '').length > 0 -> не пустые узлы
                // \s+ -> все пробелы
                // parentNode -> родитель текущего элемента
            });
            // element.childNodes -> все дочерние элементы, которые он содержит
        }

        recursy(body);
    }

    onColorChange(event) {
        const body = document.querySelector('body');
        body.style.backgroundColor = event.target.value;
        console.log(event.target.value);
    }

    render() {
        let scaleInputS = document.createElement('input'),
            scaleInputM = document.createElement('input'),
            panel = document.createElement('div');

        panel.append(this.btnBlock, this.colorPicker);

        scaleInputS.classList.add('scale_btn');
        scaleInputM.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');

        scaleInputS.setAttribute('type', 'button');
        scaleInputM.setAttribute('type', 'button');
        scaleInputS.setAttribute('value', '1x');
        scaleInputM.setAttribute('value', '1.5x');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        this.btnBlock.append(scaleInputS, scaleInputM);

        panel.classList.add('panel');

        document.querySelector('body').append(panel);
    }
}

export {Customizator};