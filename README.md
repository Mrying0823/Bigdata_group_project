<<<<<<< HEAD
2023 年 7 月小学期小组合作完成的基础大数据分析项目

10天项目

环境准备：虚拟机 Centos7 或 Ubuntu 环境、Java1.8、Hadoop-2.10.2、Spark-3.0.0-bin-hadoop2.7、Zookeeper-3.4.12、HBase-2.5.5-bin、IDEA（安装插件 BigDataTool、Scala）、Maven、MySQL8.0 数据库、XShell、Xftp、Scala-2.12.12（Windows下）

开发语言：Scala、Java、Html 等

项目开发流程：Scala 基础编程->Scala 集合 ->Scala 统计数据练习->SparkCore 核心编程（RDD，Spark-shell）->SparkSQL->SpringBoot->Zookeeper->HBase->SparkMLIB 机器学习

各个流程基本要求：

1、Scala：统计单词个数

2、SparkCore 核心编程：IDEA 新建 Maven 项目，通过 Spark 统计单词个数。项目打包 jar 包，在 Spark 的 bin 目录下运行 jar 包，读取上传至 HDFS 单词文件并完成统计。Spark-shell创建RDD，完成基本数据分析

3、SparkSQL：csv 数据源上传至 HDFS，Spark-shell 读取 HDFS 上 csv 数据源创建 DataFrame，进行数据分析。将上述知识应用在 IDEA 开发 SparkSQL 项目中，分析好的数据存入 MySQL 数据库，也可以利用 SparkSQL 将数据库的数据读出再分析

4、SpringBoot：依赖配置要搞好，实现前端页面数据可视化展示

5、Zookeeper、HBase：在此之前，数据都是经过 SparkSQL 读取 HDFS 路径下的数据源进行数据分析后存入数据库，现在加入 HBase，要求将 csv 数据源直接写入 HBase，从 HBase 读取数据

6、SparkMLIB 机器学习：预测分析
=======
# Bigdata_group_project
>>>>>>> 5805cf072d88b9d4d3689fdb256998584013ea83
