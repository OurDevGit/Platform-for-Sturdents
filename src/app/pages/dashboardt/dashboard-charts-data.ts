import {
  CHART_COLOR_1,
  CHART_COLOR_3,
  CHART_COLOR_4
} from "../../utils/colors";

// This file contains variables and functions for generating echarts at dashboard page.
export function getPolarChartData(items) {
  let series = items.map((item, i) => {
    return {
      name: i,
      type: "pie",
      clockWise: true,
      hoverAnimation: false,
      cursor: "default",
      startAngle: 270,
      radius: [70 + i * 6 + "%", 70 + i * 6 + 2.5 + "%"],
      label: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: item.value,
          name: item.value,
          itemStyle: {
            normal: {
              color: item.color
            },
            emphasis: {
              color: item.color
            }
          }
        },
        {
          value: 1 - item.value,
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ]
    };
  });
  return {
    series: series
  };
}

export function getGroupBarData(barGroupItems) {
  let series = barGroupItems.items.map(item => {
    return {
      name: item.name,
      type: "bar",
      cursor: "default",
      data: item.values,
      itemStyle: {
        normal: {
          color: item.color,
          barBorderRadius: 2
        },
        emphasis: {
          color: item.color
        }
      }
    };
  });
  return {
    legend: {
      type: "scroll",
      left: -5,
      itemGap: 5,
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      data: barGroupItems.items.map(item => item.name),
      textStyle: {
        fontFamily: "OpenSans",
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.59)",
        padding: [0, 30, 0, 0]
      }
    },
    barWidth: 3,
    barGap: "100%",
    grid: {
      top: 50,
      left: 5,
      right: 0,
      bottom: 20,
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        offset: 5,
        data: barGroupItems.labels,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          fontFamily: "OpenSans",
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.59)"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        offset: 30,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontFamily: "OpenSans",
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.59)",
          align: "left"
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0, 0, 0, 0.11)"
          }
        }
      }
    ],
    series: series
  };
}

export const trendLineChartData = {
  grid: {
    top: 20,
    bottom: 20,
    left: 5,
    right: 5
  },
  xAxis: {
    data: ["Thu", "", "Fri", "", "Sat", "", "Sun", "", "Mon"],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(0, 0, 0, 0.11)",
        type: "dashed",
        width: 1
      }
    }
  },
  tooltip: {
    show: true,
    textStyle: {
      fontFamily: "OpenSans",
      fontSize: 12
    },
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    formatter: "$ {c0}",
    extraCssText: "border-radius: 2px"
  },
  yAxis: {
    show: false,
    min: 11500,
    max: 9500
  },
  series: [
    {
      type: "line",
      symbolSize: 25,
      data: [10257, 10824, 9924, 10900, 10500, 11500, 11000, 11200, 11000],
      lineStyle: {
        normal: {
          color: CHART_COLOR_1,
          width: 3,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowBlur: 10,
          shadowOffsetY: 13
        }
      },
      itemStyle: {
        normal: {
          opacity: 0
        }
      }
    }
  ]
};

export const radarChartData = {
  legend: {
    left: -5,
    itemGap: 40,
    itemWidth: 8,
    itemHeight: 8,
    icon: "circle",
    data: ["2017 year", "2018 year"],
    textStyle: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)"
    }
  },
  grid: {
    top: 200,
    left: 200
  },
  radar: {
    center: ["50%", "60%"],
    radius: "70%",
    name: {
      textStyle: {
        fontFamily: "OpenSans",
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.59)"
      }
    },
    indicator: [
      { name: "Jan", max: 100 },
      { name: "Feb", max: 100 },
      { name: "Mar", max: 100 },
      { name: "Apr", max: 100 },
      { name: "May", max: 100 },
      { name: "Jun", max: 100 },
      { name: "Jul", max: 100 }
    ],
    splitArea: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: "rgba(0, 0, 0, 0.11)",
        width: 2
      }
    },
    axisLine: {
      lineStyle: {
        color: "rgba(0, 0, 0, 0.11)",
        width: 2
      }
    }
  },
  series: [
    {
      type: "radar",
      itemStyle: {
        normal: {
          opacity: 0
        }
      },
      lineStyle: {
        normal: {
          opacity: 0
        }
      },
      areaStyle: {
        normal: {
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowOffsetY: 15,
          shadowBlur: 14
        }
      },
      data: [
        {
          name: "2018 year",
          value: [20, 80, 70, 85, 100, 30, 100],
          areaStyle: {
            normal: {
              opacity: 0.7,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: CHART_COLOR_4 // color at 0% position
                  },
                  {
                    offset: 1,
                    color: "#0099bf" // color at 100% position
                  }
                ],
                globalCoord: false // false by default
              }
            }
          },
          itemStyle: {
            normal: {
              color: CHART_COLOR_4
            }
          }
        },
        {
          name: "2017 year",
          value: [100, 15, 100, 50, 90, 50, 20],
          areaStyle: {
            normal: {
              opacity: 0.7,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: CHART_COLOR_1 // color at 0% position
                  },
                  {
                    offset: 1,
                    color: CHART_COLOR_3 // color at 100% position
                  }
                ],
                globalCoord: false // false by default
              }
            }
          },
          itemStyle: {
            normal: {
              color: CHART_COLOR_1
            }
          }
        }
      ]
    }
  ]
};

export const areaChartData = {
  legend: {
    left: 15,
    itemGap: 40,
    itemWidth: 8,
    itemHeight: 8,
    icon: "circle",
    data: ["2017 year", "2018 year"],
    textStyle: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)"
    }
  },
  grid: {
    left: -10,
    right: -10,
    top: 20,
    bottom: -2
  },
  xAxis: [
    {
      type: "category",
      data: new Array(26),
      show: false
    }
  ],
  yAxis: [
    {
      type: "value",
      show: false,
      min: 0
    }
  ],
  series: [
    {
      type: "line",
      name: "2018 year",
      showSymbol: false,
      smooth: true,
      lineStyle: {
        normal: {
          opacity: 0
        }
      },
      itemStyle: {
        normal: {
          color: CHART_COLOR_4
        }
      },
      areaStyle: {
        normal: {
          opacity: 1,
          shadowBlur: 14,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowOffsetY: 0,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: CHART_COLOR_4 // color at 0% position
              },
              {
                offset: 1,
                color: "#ffffff" // color at 100% position
              }
            ]
          }
        }
      },
      data: [
        50,
        55,
        60,
        55,
        70,
        45,
        30,
        50,
        55,
        65,
        80,
        65,
        55,
        65,
        90,
        40,
        30,
        30,
        45,
        65,
        55,
        50,
        50,
        55,
        45,
        65
      ]
    },
    {
      type: "line",
      name: "2017 year",
      showSymbol: false,
      smooth: true,
      lineStyle: {
        normal: {
          opacity: 0
        }
      },
      itemStyle: {
        normal: {
          color: CHART_COLOR_1
        }
      },
      areaStyle: {
        normal: {
          opacity: 1,
          shadowBlur: 14,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowOffsetY: 0,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: CHART_COLOR_1 // color at 0% position
              },
              {
                offset: 1,
                color: "#ffffff" // color at 100% position
              }
            ],
            globalCoord: false // false by default
          }
        }
      },
      data: [
        55,
        65,
        45,
        60,
        80,
        75,
        80,
        85,
        75,
        60,
        62,
        63,
        65,
        70,
        90,
        55,
        57,
        40,
        55,
        27,
        39,
        76,
        40,
        35,
        94,
        18
      ]
    }
  ]
};

export const lineChartData = {
  grid: {
    left: 40,
    right: 0,
    bottom: 30
  },
  legend: {
    left: -5,
    itemGap: 40,
    itemWidth: 8,
    itemHeight: 8,
    icon: "circle",
    data: ["2017 year", "2018 year"],
    textStyle: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)"
    }
  },
  xAxis: {
    type: "category",
    offset: 5,
    data: ["26", "27", "28", "29", "30", "31"],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)"
    }
  },
  yAxis: {
    type: "value",
    offset: 30,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontFamily: "OpenSans",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.59)",
      align: "left"
    },
    splitLine: {
      lineStyle: {
        color: "rgba(0, 0, 0, 0.11)"
      }
    }
  },
  series: [
    {
      name: "2018 year",
      type: "line",
      lineStyle: {
        normal: {
          width: 3,
          color: CHART_COLOR_4,
          shadowColor: "rgba(0, 0, 0, 0.36)",
          shadowOffsetY: 9,
          shadowBlur: 13
        }
      },
      itemStyle: {
        normal: {
          color: CHART_COLOR_4,
          borderWidth: 3,
          borderColor: CHART_COLOR_4
        }
      },
      symbolSize: 12,
      data: [130, 175, 150, 225, 125, 165]
    },
    {
      name: "2017 year",
      type: "line",
      lineStyle: {
        normal: {
          width: 3,
          color: CHART_COLOR_1,
          shadowColor: "rgba(0, 0, 0, 0.36)",
          shadowOffsetY: 9,
          shadowBlur: 13
        }
      },
      itemStyle: {
        normal: {
          color: CHART_COLOR_1,
          borderWidth: 3,
          borderColor: CHART_COLOR_1
        }
      },
      symbolSize: 12,
      data: [150, 100, 175, 140, 170, 90]
    }
  ]
};

export const barChartData = {
  barWidth: 3,
  grid: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  },
  xAxis: [
    {
      show: false,
      type: "category",
      data: new Array(48).fill("")
    }
  ],
  yAxis: [
    {
      splitNumber: 3,
      type: "value",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(0, 0, 0, 0.11)"
        }
      }
    }
  ],
  series: {
    type: "bar",
    cursor: "default",
    itemStyle: {
      normal: {
        color: CHART_COLOR_1,
        barBorderRadius: 2
      },
      emphasis: {
        color: CHART_COLOR_1
      }
    },
    data: [
      25,
      45,
      50,
      75,
      40,
      20,
      30,
      -40,
      -30,
      40,
      90,
      10,
      5,
      -10,
      -20,
      -30,
      -40,
      -50,
      25,
      -55,
      -25,
      -60,
      -40,
      20,
      -20,
      -10,
      -25,
      20,
      30,
      45,
      50,
      90,
      20,
      10,
      -10,
      -20,
      -30,
      -40,
      -50,
      25,
      -55,
      -25,
      -60,
      -40,
      40,
      -20,
      -10,
      -25,
      20
    ]
  }
};

export const pieChartData = {
  series: [
    {
      type: "pie",
      clockWise: true,
      hoverAnimation: false,
      cursor: "default",
      radius: [37, 40],
      label: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: 0.81,
          itemStyle: {
            normal: {
              color: CHART_COLOR_4
            },
            emphasis: {
              color: CHART_COLOR_4
            }
          }
        },
        {
          value: 0.19,
          itemStyle: {
            normal: {
              color: "rgba(0, 0, 0, 0.11)"
            },
            emphasis: {
              color: "rgba(0, 0, 0, 0.11)"
            }
          }
        }
      ]
    }
  ]
};

export function smallPieData(val) {
  return {
    series: [
      {
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        cursor: "default",
        radius: [0, "100%"],
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: val,
            itemStyle: {
              normal: {
                color: CHART_COLOR_1
              },
              emphasis: {
                color: CHART_COLOR_1
              }
            }
          },
          {
            value: 1 - val,
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0.11)"
              },
              emphasis: {
                color: "rgba(0, 0, 0, 0.11)"
              }
            }
          }
        ]
      }
    ]
  };
}
