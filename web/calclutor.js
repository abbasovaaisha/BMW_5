document.addEventListener('DOMContentLoaded', function() {
    // Создаем структуру калькулятора
    const calculatorSection = document.createElement('section');
    calculatorSection.className = 'calculator-section bg-light p-4 rounded col-12 mt-4';
    calculatorSection.id = 'calculator';
    
    calculatorSection.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title h5">Калькулятор стоимости BMW</h2>
                <form id="bmwCalculatorForm">
                    <div class="mb-3">
                        <label for="product" class="form-label">Выберите модель:</label>
                        <select class="form-select" id="product" name="product" required>
                            <option value="" disabled selected>Выберите модель</option>
                            <option value="2500000">BMW 3 Series - 2 500 000 руб.</option>
                            <option value="3500000">BMW 5 Series - 3 500 000 руб.</option>
                            <option value="5500000">BMW 7 Series - 5 500 000 руб.</option>
                            <option value="4500000">BMW X3 - 4 500 000 руб.</option>
                            <option value="6000000">BMW X5 - 6 000 000 руб.</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="quantity" class="form-label">Количество:</label>
                        <input type="text" class="form-control" id="quantity" name="quantity" 
                               required pattern="^[1-9][0-9]*$" 
                               placeholder="Введите количество">
                        <div class="form-text text-danger" id="quantityError" style="display: none;">
                            Пожалуйста, введите корректное количество (только цифры, начинающиеся не с нуля)
                        </div>
                    </div>
                    <button type="submit" class="btn btn-dark w-100">Рассчитать стоимость</button>
                </form>
                <div id="result" class="mt-3" style="display: none;"></div>
            </div>
        </div>
    `;

    // Вставляем калькулятор после формы
    const formSection = document.querySelector('.form-section');
    formSection.parentNode.insertBefore(calculatorSection, formSection.nextSibling);

    // Инициализация обработчиков событий
    const calculatorForm = document.getElementById('bmwCalculatorForm');
    const quantityInput = document.getElementById('quantity');
    const quantityError = document.getElementById('quantityError');
    const resultDiv = document.getElementById('result');

    // Обработчик изменения поля количества
    quantityInput.addEventListener('input', function() {
        validateQuantity();
    });

    // Обработчик отправки формы
    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            calculateTotal();
        }
    });

    // Функция валидации количества
    function validateQuantity() {
        const quantityValue = quantityInput.value.trim();
        const regex = /^[1-9][0-9]*$/;
        
        if (quantityValue === '' || regex.test(quantityValue)) {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('is-invalid');
            return true;
        } else {
            quantityError.style.display = 'block';
            quantityInput.classList.add('is-invalid');
            return false;
        }
    }

    // Функция валидации всей формы
    function validateForm() {
        const productSelect = document.getElementById('product');
        const isQuantityValid = validateQuantity();
        const isProductSelected = productSelect.value !== '';
        
        if (!isProductSelected) {
            productSelect.classList.add('is-invalid');
            return false;
        } else {
            productSelect.classList.remove('is-invalid');
        }
        
        return isQuantityValid && isProductSelected;
    }

    // Функция расчета общей стоимости
    function calculateTotal() {
        const productSelect = document.getElementById('product');
        const quantity = parseInt(quantityInput.value);
        const price = parseInt(productSelect.value);
        
        const total = price * quantity;
        
        // Форматируем число с пробелами для тысяч
        const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <h5 class="alert-heading">Результат расчета:</h5>
                <p class="mb-1">Стоимость заказа: <strong>${formattedTotal} руб.</strong></p>
                <hr>
                <p class="mb-0 small">
                    Количество: ${quantity} шт.<br>
                    Цена за единицу: ${(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.
                </p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        // Прокрутка к результату
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Валидация при изменении выбора товара
    document.getElementById('product').addEventListener('change', function() {
        this.classList.remove('is-invalid');
    });
});