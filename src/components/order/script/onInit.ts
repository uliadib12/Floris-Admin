import AddressModel from "../../../model/order/addressModel";
import OrderModel from "../../../model/order/orderModel";
import ProductModel from "../../../model/order/productModel";
import UserModel from "../../../model/users/userModel";

onInit();

async function onInit() : Promise<void>
{
    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year');

    if(year !== null) {
        const data = await getData(year);
        setDataToTable(data);
        setYearInOrder(year);
        setUpOnYearCalender();
        makeContentVisible();
    }
    else {
        const thisYear = new Date().getFullYear();
        const data = await getData(thisYear.toString());
        setDataToTable(data);
        setYearInOrder(thisYear.toString());
        setUpOnYearCalender();
        makeContentVisible();
    }
}

function getData(year: string) : Promise<OrderModel[]>
{
    return new Promise((resolve, reject) => {
       resolve([
        new OrderModel({
            id: 1,
            user: new UserModel({
                id: 1,
                email: 'test',
                createdDate: 'test',
                banned: false
            }),
            address: new AddressModel({
                name: 'test',
                email: 'test',
                phone: 'test',
                address: 'Jl. Test',
                day: 'test',
                time: 'test'
            }),
            products: [
                new ProductModel({
                    name: 'test',
                    variant: 'test',
                    quantity: 1,
                    additionalInfo: 'test',
                    price: 1
                })
            ],
            payment: {
                name: 'test'
            },
            price: 1,
            orderDate: 'test',
            orderStatus: 'test',
            nextStep: [
                {
                    type: {
                        name: 'success',
                        color: 'success'
                    },
                    name: 'next step'
                }
            ]
        })
       ,
        new OrderModel({
            id: 2,
            user: new UserModel({
                id: 2,
                email: 'test2',
                createdDate: 'test2',
                banned: false
            }),
            address: new AddressModel({
                name: 'test',
                email: 'test',
                phone: 'test',
                address: 'Jl. Test',
                day: 'test',
                time: 'test'
            }),
            products: [
                new ProductModel({
                    name: 'test',
                    variant: 'test',
                    quantity: 1,
                    additionalInfo: 'test',
                    price: 1
                })
            ],
            payment: {
                name: 'test'
            },
            price: 1,
            orderDate: 'test',
            orderStatus: 'test',
            nextStep: [
                {
                    type: {
                        name: 'test',
                        color: 'test'
                    },
                    name: 'test'
                }
            ]
        })
    ]);
    });
}

function setDataToTable(data: OrderModel[]) : void
{
    const table = $('#dataTable')[0] as HTMLTableElement;
    const tbody = table.tBodies[0];
    data.forEach(order => {
        const row = tbody.insertRow();
        const idCell = row.insertCell();
        const userCell = row.insertCell();
        const addressCell = row.insertCell();
        const productsCell = row.insertCell();
        const paymentCell = row.insertCell();
        const priceCell = row.insertCell();
        const orderDateCell = row.insertCell();
        const orderStatusCell = row.insertCell();
        const nextStepCell = row.insertCell();

        idCell.innerText = order.id.toString();
        userCell.innerHTML = order.user ? createButtonElementToShowUserModal(order.user).outerHTML : '-';
        addressCell.innerHTML = createButtonElementToShowAddressModal(order.address).outerHTML;
        productsCell.innerHTML = createButtonElementToShowProductModal(order.products).outerHTML;
        paymentCell.innerHTML = order.payment.name;
        priceCell.innerHTML = order.price.toString();
        orderDateCell.innerHTML = order.orderDate;
        orderStatusCell.innerHTML = order.orderStatus;
        nextStepCell.innerHTML = order.nextStep.map(step => `<button class="badge badge-${step.type.color}">${step.name}</button>`).join(' ');
    });

    setOnButtonClickButtonUserModal();
    setOnButtonClickButtonAddressModal();
    setOnButtonClickButtonProductModal();
}

function setYearInOrder(year: string) : void
{
    const yearInOrder = $('#year')[0] as HTMLSpanElement;
    yearInOrder.innerText = year;
}

function getYearList() : number[]
{
    const thisYear = new Date().getFullYear();
    const yearList = Array.from({length: thisYear - 2023 + 1}, (v, i) => thisYear - i);
    return yearList;
}

function setUpOnYearCalender() : void
{
    const yearCalender = $('#yearCalender')[0] as HTMLSelectElement;
    yearCalender.addEventListener('change', () => {
        const year = yearCalender.value;
        const currentPath = window.location.pathname;
        if(year === new Date().getFullYear().toString()) {
            window.location.href = currentPath;
            return;
        }
        window.location.href = `${currentPath}?year=${year}`;
    });

    const yearList = getYearList();
    setYearListElement(yearList);
}

function setYearListElement(yearList: number[]) : void
{
    const searchParams = new URLSearchParams(window.location.search);
    let yearFromUrl = searchParams.get('year');

    if(yearFromUrl === null) {
        yearFromUrl = new Date().getFullYear().toString();
    }

    const yearCalender = $('#yearCalender')[0] as HTMLSelectElement;
    yearList.forEach(year => {
        const option = document.createElement('option');
        option.value = year.toString();
        option.innerText = year.toString();
        if(yearFromUrl === year.toString()) {
            option.selected = true;
        }
        yearCalender.appendChild(option);
    });
}

function makeContentVisible() : void
{
    const content = $('#content-order')[0] as HTMLDivElement;
    content.classList.remove('invisible');
}

function createButtonElementToShowUserModal(user: UserModel) : HTMLButtonElement
{
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'user-modal-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.setAttribute('data-user', JSON.stringify(user));
    button.innerText = user.id.toString();
    return button;
}

function setOnButtonClickButtonUserModal(){
    const button = $('.user-modal-button');
    $(button).on('click', function(){
        const user = UserModel.fromJson(JSON.parse($(this).attr('data-user') as string));
        const modal = $('#modal');
        modal.find('.modal-title').text(`user ${user.id}`);
        modal.find('.modal-body').html(`
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Created Date:</strong> ${user.createdDate}</p>
            <p><strong>Banned:</strong> ${user.banned ? 'Yes' : 'No'}</p>
        `);
    });
}

function createButtonElementToShowAddressModal(address: AddressModel) : HTMLButtonElement
{
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'address-modal-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.setAttribute('data-address', JSON.stringify(address));
    button.innerText = address.address.toString();
    return button;
}

function setOnButtonClickButtonAddressModal(){
    const button = $('.address-modal-button');
    $(button).on('click', function(){
        const address = AddressModel.fromJson(JSON.parse($(this).attr('data-address') as string));
        const modal = $('#modal');
        modal.find('.modal-title').text(`address ${address.name}`);
        modal.find('.modal-body').html(`
            <p><strong>Name:</strong> ${address.name}</p>
            <p><strong>Email:</strong> ${address.email}</p>
            <p><strong>Phone:</strong> ${address.phone}</p>
            <p><strong>Address:</strong> ${address.address}</p>
            <p><strong>Day:</strong> ${address.day}</p>
            <p><strong>Time:</strong> ${address.time}</p>
        `);
    });
}

function createButtonElementToShowProductModal(products: ProductModel[]) : HTMLButtonElement
{
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'product-modal-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.setAttribute('data-products', JSON.stringify(products));
    button.innerText = products.length.toString();
    return button;
}

function setOnButtonClickButtonProductModal(){
    const button = $('.product-modal-button');
    $(button).on('click', function(){
        const products : ProductModel[]
        = JSON.parse($(this).attr('data-products') as string);
        const modal = $('#modal');
        modal.find('.modal-title').text(`products`);
        modal.find('.modal-body').html(
            products.map(product => `
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Variant:</strong> ${product.variant}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <p><strong>Additional Info:</strong> ${product.additionalInfo}</p>
                <p><strong>Price:</strong> ${product.price}</p>
            `).join(' ')
        );
    });
}