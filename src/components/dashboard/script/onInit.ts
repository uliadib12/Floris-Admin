import DashboardModel from "../../../model/dashboard/dashboardModel";
import MoneyUtils from "../../../utils/moneyUtils";

onInit();

async function onInit() : Promise<void>
{
    const thisYear = new Date().getFullYear();
    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year');

    if(year !== null) {
        const data = await getData(year);
        setData(data);
        setYearInDashboard(year);
        setOnYearCalenderChange();
        makeContentVisible();
    }
    else {
        const data = await getData(thisYear.toString());
        setData(data);
        setYearInDashboard(thisYear.toString());
        setOnYearCalenderChange();
        makeContentVisible();
    }
}

function setOnYearCalenderChange() : void
{
    const yearCalender = $('#yearCalender')[0] as HTMLSelectElement;
    yearCalender.addEventListener('change', () => {
        const year = yearCalender.value;
        if(year === new Date().getFullYear().toString()) {
            window.location.href = '/';
            return;
        }
        window.location.href = `/?year=${year}`;
    });
}

function getYearList() : number[]
{
    const thisYear = new Date().getFullYear();
    const yearList = Array.from({length: thisYear - 2023 + 1}, (v, i) => thisYear - i);
    return yearList;
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
            option.setAttribute('selected', '');
        }
        yearCalender.appendChild(option);
    });
}

function setYearInDashboard(year: string) : void
{
    const yearCalender = $('#year')[0] as HTMLInputElement;
    yearCalender.innerHTML = year;
}

function makeContentVisible() : void
{
    $('#content-dashboard').removeClass('invisible');
}

function getData(year: string) : Promise<DashboardModel>
{
    return new Promise((resolve, reject) => {
        if(year === "2023"){
            resolve(
                new DashboardModel({
                    time: '2021-08-21',
                    earnMonth: 1000000,
                    earnAnnual: 10000000,
                    orderMonth: 100,
                    orderRequest: 100,
                    earningOverview: {
                        'Jan': 1000000,
                        'Feb': 2000000,
                        'Mar': 3000000,
                        'Apr': 4000000,
                        'May': 5000000,
                        'Jun': 6000000,
                        'Jul': 7000000,
                        'Aug': 8000000,
                        'Sep': 9000000,
                        'Oct': 10000000,
                        'Nov': 11000000,
                        'Dec': 12000000,
                    },
                    revenueSources: {
                        'Papan Bunga': 1000000,
                        'Bouquet': 2000000,
                        'Money Cake': 3000000,
                        'Snack Tower': 4000000,
                    },
                    revenuePayment: {
                        'COD': 1000000,
                        'Transfer': 2000000,
                    }
                })
            );
        }
        else{
            resolve(
                new DashboardModel({
                    time: '2021-08-21',
                    earnMonth: 2000000,
                    earnAnnual: 20000000,
                    orderMonth: 200,
                    orderRequest: 200,
                    earningOverview: {
                        'Jan': 1000000,
                        'Feb': 2000000,
                        'Mar': 3000000,
                        'Apr': 4000000,
                        'May': 5000000,
                        'Jun': 6000000,
                        'Jul': 7000000,
                        'Aug': 8000000,
                        'Sep': 9000000,
                        'Oct': 10000000,
                        'Nov': 11000000,
                        'Dec': 12000000,
                    },
                    revenueSources: {
                        'Papan Bunga': 1000000,
                        'Bouquet': 2000000,
                        'Money Cake': 3000000,
                        'Snack Tower': 4000000,
                    },
                    revenuePayment: {
                        'COD': 1000000,
                        'Transfer': 2000000,
                    }
                })
            );
        }
    });
}

function setUpYearCalender() : void
{
    const yearList = getYearList();
    setYearListElement(yearList);
}

function setData(data: DashboardModel) : void
{
    setUpYearCalender();
    $('#earn-month').text(MoneyUtils.toRupiah(data.earnMonth));
    $('#earn-annual').text(MoneyUtils.toRupiah(data.earnAnnual));
    $('#order-month').text(data.orderMonth);
    $('#order-request').text(data.orderRequest);
    setAreaChart('earn-overview', data.earningOverview);
    setPieChart('revenue-sources', 'revenue-sources-legend', data.revenueSources);
    setPieChart('payment-sources', 'payment-sources-legend', data.revenuePayment);
}

function setAreaChart(id: string, data: Record<string, number>) : void 
{
    var ctx = document.getElementById(id);
    // @ts-ignore
    new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(data),
        datasets: [{
        label: "Earnings",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: Object.values(data),
        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
        padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
        }
        },
        scales: {
        xAxes: [{
            time: {
            unit: 'date'
            },
            gridLines: {
            display: false,
            drawBorder: false
            },
            ticks: {
            maxTicksLimit: 7
            }
        }],
        yAxes: [{
            ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
                return value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).replace(',00', '');
            }
            },
            gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
            }
        }],
        },
        legend: {
        display: false
        },
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
            label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
            }
        }
        }
    }
    });
}

function setPieChart(
    id: string, 
    idLegend: string,
    data: Record<string, number>) : void
{
    // set pie lagend
    const legend = document.getElementById(idLegend);
    Object.keys(data).forEach((key, index) => {
        const element = document.createElement('div');
        element.classList.add('mr-2');
        element.classList.add('d-inline-block');
        element.innerHTML = `
            <i class="fas fa-circle" style="color: ${['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'][index]}"></i>
            ${key}
        `;
        legend?.appendChild(element);
    });

    var ctx = document.getElementById(id);
    // @ts-ignore
    new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(data),
        datasets: [{
        data: Object.values(data),
        backgroundColor: Object.keys(data).map((_, index) => {
            return ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'][index];
        }),
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });
}