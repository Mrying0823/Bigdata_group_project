package com.software.util

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.hbase.HBaseConfiguration
import org.apache.hadoop.hbase.mapreduce.TableInputFormat
import org.apache.spark.sql.{DataFrame, SaveMode, SparkSession}

/**
 * 读取HBase数据源的工具类
 */
object HBaseTools {

  /**
   * 功能：获取连接Hbase的Configuration对象
   * @return
   */
  def getHbaseConn(tableName: String): Configuration = {
    try {
      val hconf: Configuration = HBaseConfiguration.create()
      hconf.set("hbase.zookeeper.property.clientPort", "2181");
      hconf.set("hbase.zookeeper.quorum", "192.168.56.102:2181");

      //设置读取HBase表的名称和读取数量
      hconf.set(TableInputFormat.INPUT_TABLE, tableName);
      hconf.set(TableInputFormat.SCAN_BATCHSIZE, "100")
      hconf
    } catch {
      case exception: Exception =>
        sys.error(exception.getMessage)
        sys.error("HBase连接失败！")
        null
    }
  }

  /**
   * 功能：获取Session对象
   * @param appname
   * @param master
   */
  def getSession(appname:String,master:String) :SparkSession= {
    val session: SparkSession =
      SparkSession.builder().master(master).appName(appname).getOrCreate()
    session
  }

  /**
   * 分析结果写入MySQL数据库
   * @param tableName
   * @param result
   */
  def WriteMySql(tableName:String,result:DataFrame): Unit ={
    result.write
      .format("jdbc")
      .option("url","jdbc:mysql://192.168.56.102:3306/Airline?serverTimezone=GMT%2B8&useSSL=false&useUnicode=true&characterEncoding=UTF-8")
      .option("driver","com.mysql.cj.jdbc.Driver")
      .option("user","root")
      .option("password","123456")
      .option("dbtable",tableName)
      .mode(SaveMode.Overwrite)
      .save()
  }
}
