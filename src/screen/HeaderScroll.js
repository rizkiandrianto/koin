/**
* @providesModule screen/HeaderScroll
*/

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ChartView from 'react-native-highcharts';

const styles = StyleSheet.create({
    image: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

class HeaderScroll extends Component {
    static navigationOptions = { header: null };
    render() {
        var Highcharts='Highcharts';
        var conf={
            chart: {
                backgroundColor: "#00897B",
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE 
                marginTop: 60,
                events: {
                    load: function () {
    
                        // set up the updating of the chart each second 
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time 
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                type: 'datetime',
                tickPixelInterval: 150,
                lineWidth: 0,
                tickWidth: 0,
            },
            yAxis: {
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                gridLineWidth: 0
            },
            plotOptions: {
                series: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data 
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
    
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };
        {/* <Image source={{
        uri: "https://images.alphacoders.com/371/thumb-1920-371.jpg"
        }} style={styles.image} /> */}
        return (
            <HeaderImageScrollView
                maxHeight={300}
                minHeight={60}
                minOverlayOpacity={0.6}
                renderHeader={() => (
                    <ChartView style={{height:300}} config={conf} />
                )}
            >
                <View style={{ height: 1000 }}>
                    <TriggeringView onHide={() => console.log('text hidden')} >
                    <Text>Scroll Me!</Text>
                    </TriggeringView>
                </View>
            </HeaderImageScrollView>
        );
    }
}

export default HeaderScroll;