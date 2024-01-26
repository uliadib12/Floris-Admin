export default class DashboardModel {
    time: string;
    earnMonth: number;
    earnAnnual: number;
    orderMonth: number;
    orderRequest: number;
    earningOverview: Record<string, number>;
    revenueSources: Record<string, number>;
    revenuePayment: Record<string, number>;

    constructor({
        time,
        earnMonth,
        earnAnnual,
        orderMonth,
        orderRequest,
        earningOverview,
        revenueSources,
        revenuePayment
    }: {
        time: string;
        earnMonth: number;
        earnAnnual: number;
        orderMonth: number;
        orderRequest: number;
        earningOverview: Record<string, number>;
        revenueSources: Record<string, number>;
        revenuePayment: Record<string, number>;
    }) {
        this.time = time;
        this.earnMonth = earnMonth;
        this.earnAnnual = earnAnnual;
        this.orderMonth = orderMonth;
        this.orderRequest = orderRequest;
        this.earningOverview = earningOverview;
        this.revenueSources = revenueSources;
        this.revenuePayment = revenuePayment;
    }
}