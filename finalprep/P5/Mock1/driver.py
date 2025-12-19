from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "filereader"


conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SparkContext(conf=conf)
file_path = "hdfs:///data/user_events.csv"
output_path = "hdfs:///output/purchases_per_user"

linesRDD = sc.textFile(file_path)

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line : line != header)

eventRDD = dataRDD.map(lambda line : line.split(','))

purchaseRDD = eventRDD.filter(lambda event: event[1]=='purchase')
for row in purchaseRDD.take(10):
    print(row)

purchasesByUserRDD = purchaseRDD.map(lambda p : (p[0], 1)).reduceByKey(lambda a, b:a+b)

sortedRDD = purchasesByUserRDD.sortBy(lambda x: x[1], ascending=False)

sortedRDD.map(lambda x : {'User ID': x[0], 'Purchase count': x[1]}).saveTextAsFile(output_path)
     
sc.stop()

