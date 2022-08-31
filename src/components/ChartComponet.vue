<template lang="">
    <div>
        <div :id="idName" style="width: 800px; height: 500px;"></div>
    </div>
</template>
<script>

export default {
    props: ['idName'],
    name:'ChartComponet',
    mounted() {
        window.google.charts.load('current', { 'packages': ['bar'] });
        window.google.charts.setOnLoadCallback(this.drawChart);
    },
    data() {
        return {
            arr:[],
            subtitle:'',
        }
    },
    methods: {
        drawChart() {
            var data = window.google.visualization.arrayToDataTable(this.arr);
            var options = {
                chart: {
                    title: 'MrPizzaHut ',
                    subtitle: '일 판매차트'
                }
            };
            /*
            돔접근
            */
            var chart = new window.google.charts.Bar(document.getElementById(this.idName));
            var formatter = new window.google.visualization.NumberFormat({ prefix: '원', negativeParens: true });
            /**
             * 막대바 만듬  formatter.format(data, 1);
             * */
            formatter.format(data, 1);
            chart.draw(data, window.google.charts.Bar.convertOptions(options));
        },
        setArr(data){
            this.arr=data;
        }
    }
}
</script>
<style lang="">
    
</style>