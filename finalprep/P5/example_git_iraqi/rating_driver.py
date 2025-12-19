"""
 * This Python source file was translated from Java.
"""
from pyspark import SparkContext, SparkConf

class Driver:
    MASTER_URL = "spark://10.10.10.10:7070"
    APP_NAME = "Rating"
    
    @staticmethod
    def main(args):
        conf = SparkConf().setAppName(Driver.APP_NAME).setMaster(Driver.MASTER_URL)
        sc = SparkContext(conf=conf)
        #Data loading using list
        ratings = [
            Rating("P001", 5),
            Rating("P001", 4),
            Rating("P001", 5),
            Rating("P002", 3),
            Rating("P002", 4),
            Rating("P002", 2),
            Rating("P002", 3),
            Rating("P003", 5),
            Rating("P003", 5),
            Rating("P004", 1),
            Rating("P004", 2),
            Rating("P004", 3),
            Rating("P004", 2),
            Rating("P005", 4),
            Rating("P005", 5)
        ]
        
        #Convert list into RDD for parallel processing
        #sc.parallelize() for lists (array, list, set)
        #sc.textFile() for external files (HDFS, S3, local FS)
        ratingRDD = sc.parallelize(ratings)
        
        #Transform each rating object into a tuple (Rating("P001", 5) becomes ("P001", 5))
        indexedRatingRDD = ratingRDD.map(lambda rating: (rating.getProductId(), rating.getStars()))
        
        #Groups by productId & sums all star ratings (("P123", 4), ("P123", 5) becomes ("P123", 9))
        ratingSumByProductRDD = indexedRatingRDD.reduceByKey(lambda a, b: a + b)
        
        #Maps each rating to (productId, 1) then sums to get count (("P123", 4), ("P123", 5) becomes ("P123", 2))
        ratingCountByProductRDD = indexedRatingRDD.map(lambda indexedRating: (indexedRating[0], 1)).reduceByKey(lambda a, b: a + b)
        
        #Combines sum and count into one RDD (("P123", (9, 2)) - product P123 has sum=9, count=2)
        ratingSumAndCountByProductRDD = ratingSumByProductRDD.join(ratingCountByProductRDD)
        
        #Divides sum by count to get average (("P123", (9, 2)) becomes ("P123", 4.5))
        averageRatingByProductRDD = ratingSumAndCountByProductRDD.map(lambda sumAndCountByProduct: (sumAndCountByProduct[0], float(sumAndCountByProduct[1][0]) / sumAndCountByProduct[1][1]))
        
        #Collects & displays resutls (collect() brings all results from the cluster to the driver program)
        averageRatingsByProduct = averageRatingByProductRDD.collect()
        
        #Iterates and prints each product's average rating
        for productId, avgRating in averageRatingsByProduct:
            print(str(productId) + " : " + str(avgRating))

if __name__ == "__main__":
    import sys
    Driver.main(sys.argv)