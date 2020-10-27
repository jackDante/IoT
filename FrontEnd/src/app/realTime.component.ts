import { Component, Input, } from '@angular/core';
import { DataModel } from './models/DataModel';
import { DatasetModel } from './models/DatasetModel';
import * as moment from 'moment';



@Component({
  selector: 'app-real-time',
  templateUrl: './realTime.component.html',
  styleUrls: ['./app.component.scss']
})
export class RealTimeComponent {
  @Input()
  private nobleEntrancePeopleLimit: number;
  @Input()
  private ExitPeopleLimit: number;
  @Input()
  private OfficeFirstFloorPeopleLimit: number;
  @Input()
  private BathFirstFloorPeopleLimit: number;
  

  @Input()
  private datasetSize: number;
  // CHART TYPE (pie, radar, bar, horizontalBar, line)
  chartType = 'bar';

  private colorIndex = 0;
  private dataset: DatasetModel[] = [];
  public chartDatasets: any[] = [];
  public chartLabels: string[] = [];

  // classic colors: when #people > peoplelimit -> red color. Alarm! 
  public chartColors: Array<any> = [
    {
      borderColor: 'aquamarine',
      backgroundColor: 'aquamarine',
      originalColor: 'aquamarine',
      borderWidth: 2,
    },
    {
      borderColor: 'bisque',
      backgroundColor: 'bisque',
      originalColor: 'bisque',
      borderWidth: 2,
    },
    {
      borderColor: 'cadetblue',
      backgroundColor: 'cadetblue',
      originalColor: 'cadetblue',
      borderWidth: 2,
    },
    {
      borderColor: 'darkslateblue',
      backgroundColor: 'darkslateblue',
      originalColor: 'darkslateblue',
      borderWidth: 2,
    },
    {
      borderColor: 'darkgoldenrod',
      backgroundColor: 'darkgoldenrod',
      originalColor: 'darkgoldenrod',
      borderWidth: 2,
    },
    {
      borderColor: 'coral',
      backgroundColor: 'coral',
      originalColor: 'coral',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    title: {
        display: true,
        text: 'Real time data'
    },
    responsive: true
  };

  // Display current Date-Time (on top-left corner)
  public now: Date = new Date();
  constructor() {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  };

  // Display HISTORY
    div1:boolean=false;
    div2:boolean=false;

    showFunction(){
      this.div1=true;
      this.div2=false;
    }

    hideFunction(){
      this.div1=false;
      this.div2=true;
    }

  
  // -- statistics
  public history = [];

  public maxrecorded = 0;
  public wheremaxrecorded = "";
  
  public minrecorded = 0;
  public whereminrecorded = "";

  // ------------------ Set data inside our chart --------------------------
  @Input()
  set setLastData(clientsData: DataModel[]){
    if(clientsData){
      // --insert momentum (time)
      if(this.chartLabels.length > 0) 
        this.chartLabels.pop();
      this.chartLabels.push(moment().format('HH:mm:ss'));

      // --history
      this.history.push('-------------- Time: ' + moment().format('HH:mm:ss') + ' --------------');

      for(var clientData of clientsData){
        const exists = this.dataset.find(x => x.scannerId === clientData.clientId);
        if (exists) {
          exists.datasetChart.data.pop()
          if(this) this.checkPeopleExceed(clientData, exists.colorIndex);
          exists.datasetChart.data.push(clientData.people);

          // -- history
          this.history.push(clientData.topicDesc + ' = ' + clientData.people); // history
          // -- max recorded
          if(clientData.people != undefined && clientData.people > this.maxrecorded){
            this.maxrecorded = clientData.people; //maxrecorded update
            this.wheremaxrecorded = clientData.topicDesc; //wheremaxrecorded
          }

          // -- min recorded
          if(clientData.people != undefined && clientData.people <= this.minrecorded){
            this.minrecorded = clientData.people; //maxrecorded update
            this.whereminrecorded = clientData.topicDesc; //wheremaxrecorded
          }

        }
        else {
          var people = [];
          for(var i = 0; i < this.chartLabels.length - 1; i++){
            people.push(0);
          }
          people.push(clientData.people);
          this.dataset.push({ scannerId: clientData.clientId, colorIndex: this.colorIndex++, datasetChart: { data: people, label: clientData.topicDesc, fill: false } });
        }
      }

      this.chartDatasets = this.dataset.map(x => x.datasetChart);
    }
  };

  // -- check threshold (? -> red color = alarm!)
  checkPeopleExceed(data: DataModel, chartColorsIndex: number){
    if(data.topicDesc == "Entrance at ground floor" && data.people >= this.nobleEntrancePeopleLimit){
      this.chartColors[chartColorsIndex].borderColor = 'red';
    }
    else if(data.topicDesc == "Exit at ground floor" && data.people >= this.ExitPeopleLimit){
      this.chartColors[chartColorsIndex].borderColor = 'red';
    }
    else if(data.topicDesc == "Office at first floor" && data.people >= this.OfficeFirstFloorPeopleLimit){
      this.chartColors[chartColorsIndex].borderColor = 'red';
    }
    else if(data.topicDesc == "Bathroom at first floor" && data.people >= this.BathFirstFloorPeopleLimit){
      this.chartColors[chartColorsIndex].borderColor = 'red';
    }
    else{
      this.chartColors[chartColorsIndex].borderColor = this.chartColors[chartColorsIndex].originalColor;
    }
  }

//end class RealTimeComponent
}



