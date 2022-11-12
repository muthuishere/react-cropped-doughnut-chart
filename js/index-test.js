
const {HorseShoeChartCreator} = CroppedDoughnutChart

function writeTable(siteData) {

    var tickIcon = function (data, type, row) {
        if (data == 1) {
            return '<i class="fa fa-check" style="color:green"/>';
        }
        return "";
    };
    var noZero = function renderZero(data) {
        if (data == 0) {
            return '';
        }
        return data;
    }
    const columns = [
        {data: 'Site'},
        {data: 'Site-Status', render: tickIcon},
        {data: "Servers-Up"},
        {data: "Servers-Down", render: noZero},
        {data: "Servers-Unknown", render: noZero},
        {data: "Cameras-Up"},
        {data: "Cameras-Down", render: noZero},
        {data: "Cameras-Unknown", render: noZero}
    ]

    $('#example').DataTable({
        // responsive:true,
        paging: true,
        "iDisplayLength": 50,
        fixedRowHeight: false,
        filter: true,
        data: siteData,
        columns


    });


}
function agreegatedFixturesData(data, fixture){

    const aggregatedResult = data.reduce((acc, cur) => {
        let {up, down, unknown} = acc;
        up += parseInt(cur[fixture +'-Up']);
        down += parseInt(cur[fixture +'-Down']);
        unknown += parseInt(cur[fixture + '-Unknown']);
        return {up, down, unknown}

    }, {up: 0, down: 0, unknown: 0})
    let items = [
        {value: aggregatedResult.up, color: "green"},
        {value: aggregatedResult.down, color: "red"},
        {value: aggregatedResult.unknown, color: "#FF9632"},
    ]
    return items
}
function drawDoughnutChart(data, id, items, title, imgUrl) {

    //let imgUrl = "./assets/site.svg";
    const result = HorseShoeChartCreator(items, {
        radius: 105,
        title:title,
        titleColor: "#000000",
        thicknessSize: "M",
        gapSize: "L",
        labelSize: 12,
        labelColor: "white",
        backgroundColor: "white",
        imgUrl
    });

    const siteChartContainer = document.getElementById(id);
    siteChartContainer.appendChild(result);
}

function drawCharts(data) {

    drawSiteChart(data);
    drawServerChart(data);
    drawCameraChart(data);
}

$(document).ready(function () {
    initData();

});

function drawSiteChart(data) {

    const aggregatedResult = data.reduce((acc, cur) => {
        let {up, down} = acc;
        if (cur['Site-Status'] === '0') {
            down++;
        } else {
            up++;
        }
        return {up, down}

    }, {up: 0, down: 0})
    const items = [
        {value: aggregatedResult.up, color: "green"},
        {value: aggregatedResult.down, color: "red"},
    ]
    let imgUrl = "./assets/site.svg"
    drawDoughnutChart(data,'sites-chart', items,'Sites',imgUrl);

}

function drawServerChart(data) {
   let items = agreegatedFixturesData(data,'Servers');
    let imgUrl = "./assets/server.svg";
    drawDoughnutChart(data,'servers-chart', items,'Servers',imgUrl);
}

function drawCameraChart(data) {

    let items = agreegatedFixturesData(data,'Cameras');
    let imgUrl = "./assets/camera.svg";
    drawDoughnutChart(data,'cameras-chart', items,'Cameras',imgUrl);
}
