import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent  implements OnInit {
  totalUsers = 0;
  totalDrivers = 0;
  totalBookings = 0;

  driverStatusChartOptions: any;
  bookingsPerUserChartOptions: any;
  driverTypesCountChartOptions: any;

  users: any[] = [];
  bookings: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.dataService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
      this.updateBookingsPerUserChart(this.bookings);
      
    });

    this.dataService.getDrivers().subscribe(drivers => {
      this.totalDrivers = drivers.length;
      this.updateDriverStatusChart(drivers);
      this.updateDriverTypesCountChart(drivers);
    });

    this.dataService.getBookings().subscribe(bookings => {
      this.totalBookings = bookings.length;
      this.updateBookingsPerUserChart(bookings);
    })
  }

  updateDriverStatusChart(drivers: any[]) {
    const bookedDrivers = drivers.filter(driver => driver.isBooked).length;
    const availableDrivers = this.totalDrivers - bookedDrivers;

    this.driverStatusChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Drivers',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: availableDrivers, name: 'Available' },
            { value: bookedDrivers, name: 'Booked' }
          ],
          legend: {
            data: ['Drivers availability']
          }
        }
      ]
    };
  } 

  updateBookingsPerUserChart(bookings: any[]) {
    const userBookings = bookings.reduce((acc, booking) => {
      const userId = booking.user.id;
      acc[userId] = (acc[userId] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    const users = Object.keys(userBookings).map(userId => {
      const user = this.users.find(u => u.id === userId);
      return user ? user.name : `User ${userId}`;
    });
    const counts = Object.values(userBookings);
  
    this.bookingsPerUserChartOptions = {
      xAxis: {
        type: 'category',
        data: users,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: counts,
        type: 'bar',
        name: 'Bookings per User'
      }],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Bookings per User']
      }
    };
  }
  
  updateDriverTypesCountChart(drivers: any[]) {
    const typeCounts = drivers.reduce((acc, driver) => {
      acc[driver.type] = (acc[driver.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    const types = Object.keys(typeCounts);
    const counts = Object.values(typeCounts);
  
    this.driverTypesCountChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Vehicle Types',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: types.map(type => ({
            value: typeCounts[type],
            name: type
          }))
        }
      ]
    };
  }
  
  
  
  

}
