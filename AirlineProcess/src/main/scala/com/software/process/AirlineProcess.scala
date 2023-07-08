package com.software.process

import com.software.util.HBaseTools
import org.apache.hadoop.hbase.client.Result
import org.apache.hadoop.hbase.io.ImmutableBytesWritable
import org.apache.hadoop.hbase.mapreduce.TableInputFormat
import org.apache.hadoop.hbase.util.Bytes
import org.apache.spark.rdd.RDD
import org.apache.spark.sql.{DataFrame, SparkSession}

object AirlineProcess {
  def main(args: Array[String]): Unit = {
    val sparkSession: SparkSession =
      SparkSession.builder().master("local[*]")
        .appName("readHbase")
        .getOrCreate()

    getAirlineDataFrame(sparkSession)

    analysisAirline(sparkSession)
    tbl_airline(sparkSession)
    tbl_april(sparkSession)
    tbl_date_of_price(sparkSession)
    tbl_destination(sparkSession)
    tbl_everydays(sparkSession)
    tbl_everydays_of_mouthsandprice(sparkSession)
    tbl_june(sparkSession)
    tbl_may(sparkSession)
    tbl_source(sparkSession)
    tbl_source_to_destination(sparkSession)
    tbl_weekday(sparkSession)
    tbl_workday(sparkSession)
    tbl_type_of_day(sparkSession)
  }

  def getAirlineDataFrame(session: SparkSession): DataFrame = {

    val hconf = HBaseTools.getHbaseConn("Airline")
    val rdd: RDD[(ImmutableBytesWritable, Result)] =
      session.sparkContext.newAPIHadoopRDD(hconf, classOf[TableInputFormat], classOf[ImmutableBytesWritable], classOf[Result])
    import session.implicits._

    val df: DataFrame = rdd.map(f => {
      val result: Result = f._2
      val id = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("ID")))
      val airline = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("AirLine")))
      val date_of_Journey = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Date_of_Journey")))
      val source = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Source")))
      val destination = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Destination")))
      val dep_Time = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Dep_Time")))
      val arrival_Time = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Arrival_Time")))
      val duration = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Duration")))
      val total_Stops = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Total_Stops")))
      val additional_Info = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Additional_Info")))
      val price = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Price")))
      val mile = Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("Mile")))

      // 转换成RDD[Row]
      (id, airline, date_of_Journey, source, destination,dep_Time,arrival_Time,duration,total_Stops,additional_Info,price,mile)
    }).toDF("ID", "AirLine", "Date_of_Journey", "Source", "Destination","Dep_Time","Arrival_Time","Duration","Total_Stops","Additional_Info","Price","Mile")
    //3.注册临时表
    df.createOrReplaceTempView("tbl_airport")
    df
  }

  //数据集
  def analysisAirline(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |SELECT ID,AirLine,Date_of_Journey,Source,Destination,Dep_Time,Arrival_Time,Duration,Total_Stops,Additional_Info,Price,Mile FROM tbl_airport
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_airline", result)

    println("success")
  }

  //对周末的日期进行筛选
  def tbl_weekday(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |
          |select Date_of_Journey as weekday,count(*) as weekdaytotal,sum(Price) as weekdaytotalprice
          |from tbl_airport
          |where
          |Date_of_Journey like "%2/03/2019" or Date_of_Journey like "%3/03/2019" or Date_of_Journey like "%10/03/2019"
          |or Date_of_Journey like "%9/03/2019" or Date_of_Journey like "17/03/2019" or Date_of_Journey like "16/03/2019"
          |or Date_of_Journey like "24/03/2019" or Date_of_Journey like "23/03/2019" or Date_of_Journey like "31/03/2019"
          |or Date_of_Journey like "30/03/2019" or Date_of_Journey like "%7/04/2019" or Date_of_Journey like "%6/04/2019"
          |or Date_of_Journey like "14/04/2019" or Date_of_Journey like "13/04/2019" or Date_of_Journey like "21/04/2019"
          |or Date_of_Journey like "20/04/2019" or Date_of_Journey like "28/04/2019" or Date_of_Journey like "27/04/2019"
          |or Date_of_Journey like "%5/05/2019" or Date_of_Journey like "%4/05/2019" or Date_of_Journey like "12/05/2019"
          |or Date_of_Journey like "11/05/2019" or Date_of_Journey like "19/05/2019" or Date_of_Journey like "18/05/2019"
          |or Date_of_Journey like "26/05/2019" or Date_of_Journey like "25/05/2019" or Date_of_Journey like "2/06/2019"
          |or Date_of_Journey like "%1/06/2019" or Date_of_Journey like "%9/06/2019" or Date_of_Journey like "%8/06/2019"
          |or Date_of_Journey like "16/06/2019" or Date_of_Journey like "15/06/2019" or Date_of_Journey like "23/06/2019"
          |or Date_of_Journey like "22/06/2019" or Date_of_Journey like "30/06/2019" or Date_of_Journey like "29/06/2019"
          |group by Date_of_Journey
          |order by Date_of_Journey desc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_weekday", result)

    println("success")
  }

  //对工作日的日期进行筛选
  def tbl_workday(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |
          |select Date_of_Journey as workday,count(*) as workdaytotal,sum(Price) as workdaytotalprice
          |from tbl_airport
          |where
          |Date_of_Journey not like "%2/03/2019" or Date_of_Journey not like "%3/03/2019" or Date_of_Journey not like "10/03/2019"
          |or Date_of_Journey not like "%9/03/2019" or Date_of_Journey not like "17/03/2019" or Date_of_Journey not like "16/03/2019"
          |or Date_of_Journey not like "24/03/2019" or Date_of_Journey not like "23/03/2019" or Date_of_Journey not like "31/03/2019"
          |or Date_of_Journey not like "30/03/2019" or Date_of_Journey not like "%7/04/2019" or Date_of_Journey not like "%6/04/2019"
          |or Date_of_Journey not like "14/04/2019" or Date_of_Journey not like "13/04/2019" or Date_of_Journey not like "21/04/2019"
          |or Date_of_Journey not like "20/04/2019" or Date_of_Journey not like "28/04/2019" or Date_of_Journey not like "27/04/2019"
          |or Date_of_Journey not like "%5/05/2019" or Date_of_Journey not like "%4/05/2019" or Date_of_Journey not like "12/05/2019"
          |or Date_of_Journey not like "11/05/2019" or Date_of_Journey not like "19/05/2019" or Date_of_Journey not like "18/05/2019"
          |or Date_of_Journey not like "26/05/2019" or Date_of_Journey not like "25/05/2019" or Date_of_Journey not like "2/06/2019"
          |or Date_of_Journey not like "%1/06/2019" or Date_of_Journey not like "%9/06/2019" or Date_of_Journey not like "%8/06/2019"
          |or Date_of_Journey not like "16/06/2019" or Date_of_Journey not like "15/06/2019" or Date_of_Journey not like "23/06/2019"
          |or Date_of_Journey not like "22/06/2019" or Date_of_Journey not like "30/06/2019" or Date_of_Journey not like "29/06/2019"
          |group by Date_of_Journey
          |order by Date_of_Journey desc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_workday", result)

    println("success")
  }

  //对一天每个时间的到达时间的分析
  def tbl_everydays(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring_index(Dep_Time, ':', 1) as Everyday_of_Mouths,count(*) as everymoths_of_tooal,sum(Price) as everyday_of_avePrice
          |from tbl_airport
          |group by Everyday_of_Mouths
          |order by cast(Everyday_of_Mouths as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_everydays", result)

    println("success")
  }

  //对每个月航班数和总价格的筛选（然后对总价格进行求平均价格）
  def tbl_date_of_price(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring((to_date(Date_of_Journey,'dd/MM/yyyy')),6,2) as Months_of_price,count(*) as everymoths_of_day,sum(Price) as Date_of_total_Price
          |from tbl_airport
          |group by Months_of_price
          |order by Months_of_price asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_date_of_price", result)

    println("success")
  }

  //对3月航班数和总价格的筛选（然后对总价格进行求平均价格）每个月的
  def tbl_everydays_of_mouthsandprice(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring_index(Date_of_Journey, '/', 1) as Everyday_of_Mouths,count(*) as everymoths_of_tooal,
          |sum(Price) as everyday_of_avePrice
          |from tbl_airport
          |where Date_of_Journey like "%03/2019"
          |group by Everyday_of_Mouths
          |order by cast(Everyday_of_Mouths as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_everydays_of_mouthsandprice", result)

    println("success")
  }

  //对4月航班数和总价格的筛选（然后对总价格进行求平均价格）每个月的
  def tbl_april(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring_index(Date_of_Journey, '/', 1) as Everyday_of_April,count(*) as April_of_tooal,
          |sum(Price) as April_of_avePrice
          |from tbl_airport
          |where Date_of_Journey like "%04/2019"
          |group by Everyday_of_April
          |order by cast(Everyday_of_April as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_april", result)

    println("success")
  }

  //对5月航班数和总价格的筛选（然后对总价格进行求平均价格）每个月的
  def tbl_may(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring_index(Date_of_Journey, '/', 1) as Everyday_of_May,count(*) as May_of_tooal,
          |sum(Price) as May_of_avePrice
          |from tbl_airport
          |where Date_of_Journey like "%05/2019"
          |group by substring_index(Date_of_Journey, '/', 1)
          |order by cast(Everyday_of_May as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_may", result)

    println("success")
  }

  //对6月航班数和总价格的筛选（然后对总价格进行求平均价格）每个月的
  def tbl_june(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select substring_index(Date_of_Journey, '/', 1) as Everyday_of_June,count(*) as June_of_tooal,
          |sum(Price) as June_of_avePrice
          |from tbl_airport
          |where Date_of_Journey like "%06/2019"
          |group by substring_index(Date_of_Journey, '/', 1)
          |order by cast(Everyday_of_June as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_june", result)

    println("success")
  }

  //对出发地的地方进行筛选
  def tbl_source(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select Source as Source_of_Journey,count(*) as Sourcecount_of_journey
          |from tbl_airport
          |group by Source
          |order by Sourcecount_of_journey desc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_source", result)

    println("success")
  }

  //对目的地的地方进行筛选
  def tbl_destination(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select Destination as Destination_of_Journey,count(*) as Destinationcount_of_journey
          |from tbl_airport
          |group by Destination
          |order by Destinationcount_of_journey desc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_destination", result)

    println("success")
  }

  //对航空公司进行筛选
  def tbl_airline(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select AirLine as Airline_of_Journey,count(*) as Airlinecount_of_journey
          |from tbl_airport
          |group by AirLine
          |order by Airlinecount_of_journey desc limit 5
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_airline", result)

    println("success")
  }

  //对路线和里程的分析
  def tbl_source_to_destination(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select Source as Source_to_Destination,
          |Destination as Destination_of_Journey,count(*) as Sourcecount_to_Destination,
          |Mile as Source_to_Destination_of_mile,
          |sum(price) as Sourcecount_to_Destination_of_aveprice
          |from tbl_airport
          |group by Source,Destination,Mile
          |order by cast(Mile as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_source_to_destination", result)

    println("success")
  }

  //筛选星期类型
  def tbl_type_of_day(session: SparkSession): Unit = {

    val result: DataFrame =
      session.sql(
        """
          |select dayofweek(to_date(Date_of_Journey,'dd/HH/yyyy')) as day_type,
          |count(*) as total_of_day,sum(Price) as day_of_total_Price
          |from tbl_airport
          |group by day_type
          |order by cast(day_type as Int) asc
          |""".stripMargin)

    result.show(false)
    HBaseTools.WriteMySql("tbl_type_of_day", result)

    println("success")
  }
}
