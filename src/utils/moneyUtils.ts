export default class MoneyUtils {
    static toRupiah(number: number) {
        return number.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).replace(',00', '');
    }
}