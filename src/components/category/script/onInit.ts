import CategoryModel from "../../../model/category/categoryModel";
import VariantModel from "../../../model/category/variantModel";

onInit()

async function onInit() : Promise<void> {
    const data = await getData();
    setDataToTable(data);
    makeContentVisible();
}

async function getData() : Promise<CategoryModel[]> {
    const data = await fetch(`${import.meta.env.PUBLIC_BACKEND}/api/v1/category/${getCategoryName()}`)
    const json = await data.json();
    console.log(json);
    const product : CategoryModel[] = [];
    json.forEach((category : any) => {
        category = new CategoryModel({
            id: category.id,
            name: category.name,
            description: category.description,
            images: category.images,
            variants: category.variants
        });
        product.push(category);
    });

    return product;
}

function setDataToTable(data: CategoryModel[]) {
    const table = $('#dataTable')[0] as HTMLTableElement;
    const tbody = table.tBodies[0];
    data.forEach((category) => {
        const tr = tbody.insertRow();
        tr.insertCell().innerText = category.id.toString();
        tr.insertCell().innerText = category.name;
        tr.insertCell().innerHTML = createVariantButton(category.id, category.variants).map((button) => button.outerHTML).join('<br><br>');
        tr.insertCell().innerHTML = createImageButton(category.id, category.images).map((button) => button.outerHTML).join('<br><br>');
        tr.insertCell().innerText = category.description;
    });

    setOnVariantButtonClick();
    setOnImageButtonClick();
}

function makeContentVisible() {
    const content = $('#content-category')[0] as HTMLElement;
    content.classList.remove('invisible');
}

function createVariantButton(id: number, variants : VariantModel[]) : HTMLButtonElement[]
{
    const buttons : HTMLButtonElement[] = [];
    variants.forEach((variant) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'btn-sm', 'button-edit-variant');
        button.innerText = variant.name;
        button.setAttribute('data-id', id.toString());
        button.setAttribute('data-variantIndex', variants.indexOf(variant).toString());
        button.setAttribute('data-variant', JSON.stringify(variant));
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modalEditVariant');
        buttons.push(button);
    });
    return buttons;
}

function setOnVariantButtonClick(){
    const buttons = $('.button-edit-variant');
    const modal = $('#modalEditVariant');
    buttons.each((index, button) => {
        button.addEventListener('click', () => {
            const data = JSON.parse(button.getAttribute('data-variant') ?? '{}') as VariantModel;
            const id = button.getAttribute('data-id');
            const variantIndex = button.getAttribute('data-variantIndex');
            modal.find('#id').val(id);
            modal.find('#variantIndex').val(variantIndex);
            modal.find('#name').val(data.name);
            modal.find('#price').val(data.price);
            modal.find('#stock').val(data.stock);
            modal.find('#size').val(data.size);
        });
    });
}

function createImageButton(id: number, images : string[]) : HTMLButtonElement[]
{
    const buttons : HTMLButtonElement[] = [];
    images.forEach((image) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'btn-sm', 'button-edit-image');
        button.innerText = "Image" + (images.indexOf(image) + 1);
        button.setAttribute('data-id', id.toString());
        button.setAttribute('data-imageIndex', images.indexOf(image).toString());
        button.setAttribute('data-image', image);
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modalImage');
        buttons.push(button);
    });
    return buttons;
}

function setOnImageButtonClick(){
    const buttons = $('.button-edit-image');
    const modal = $('#modalImage');
    buttons.each((index, button) => {
        button.addEventListener('click', () => {
            const data = button.getAttribute('data-image');
            const id = button.getAttribute('data-id');
            const imageIndex = button.getAttribute('data-imageIndex');
            modal.find('#id').val(id);
            modal.find('#imageIndex').val(imageIndex);
            const image = modal.find('#image')[0] as HTMLImageElement;
            image.src = data ?? '';
        });
    });
}

function setOnClickAddVariant(){
    const button = $('#add-variant')[0] as HTMLButtonElement;
    const modal = $('#modalAddVariant') as any;
    const modalAddProduct = $('#modalAdd');
    const tableVariantInModalAddProduct = modalAddProduct.find('#dataTableVariant')[0] as HTMLTableElement;
    button.addEventListener('click', () => {
        // find input form
        const name = modal.find('#name')[0] as HTMLInputElement;
        const price = modal.find('#price')[0] as HTMLInputElement;
        const stock = modal.find('#stock')[0] as HTMLInputElement;
        const size = modal.find('#size')[0] as HTMLInputElement;

        const tr = tableVariantInModalAddProduct.tBodies[0].insertRow();
        tr.insertCell().innerText = name.value;
        tr.insertCell().innerText = price.value;
        tr.insertCell().innerText = stock.value;
        tr.insertCell().innerText = size.value;

        // close modal
        modal.modal('hide');
    });
}

setOnClickAddVariant();

function setOnModalAddProductShow(){
    const modal = $('#modalAdd');
    modal.on('show.bs.modal', () => {
        const tableVariantInModalAddProduct = modal.find('#dataTableVariant')[0] as HTMLTableElement;
        const tbody = tableVariantInModalAddProduct.tBodies[0];
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        const form = modal.find('#form-add-product')[0] as HTMLFormElement;
        form.reset();
    });
}

setOnModalAddProductShow();

function setOnAddProduct(){
    const modal = $('#modalAdd');
    const button = modal.find('#add-product')[0] as HTMLButtonElement;
    button.addEventListener('click', () => {
        const images = modal.find('#images')[0] as HTMLInputElement;
        const name = modal.find('#name')[0] as HTMLInputElement;
        const description = modal.find('#description')[0] as HTMLInputElement;
        const variants = getDataOnVariantTabel();
        const data = {
            images: images.files,
            name: name.value,
            description: description.value,
            variants: variants
        };
        sendToServer(data);
    });
}

function getCategoryName(){
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('name');
    return categoryName;
}

async function sendToServer(
    data: {
        images: FileList | null,
        name: string,
        description: string,
        variants: VariantModel[]
    }
){
    const images = [];
    for (let i = 0; i < data.images.length; i++) {
        const image = data.images?.item(i);
        if(image){
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
            images.push(base64);
        }
    }
    
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND}/api/v1/category/${getCategoryName()}/add-product`, {
        method: 'POST',
        body: new URLSearchParams({
            name: data.name,
            description: data.description,
            images: JSON.stringify(images),
            variants: JSON.stringify(data.variants)
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if(res.status === 200){
        alert('Success');
        window.location.reload();
    }
    else{
        alert('Failed');
    }
}

setOnAddProduct();

function getDataOnVariantTabel(){
    const table = $('#dataTableVariant')[0] as HTMLTableElement;
    const tbody = table.tBodies[0];
    const variants : VariantModel[] = [];
    tbody.childNodes.forEach((tr : any) => {
        const variant = new VariantModel({
            name: tr.childNodes[0].innerText,
            price: parseInt(tr.childNodes[1].innerText),
            stock: parseInt(tr.childNodes[2].innerText),
            size: tr.childNodes[3].innerText
        });
        variants.push(variant);
    });

    return variants;
}