Question III.1 (10 points) - API Definition in Java
public interface DocumentProcessingService {
    
    /**
     * Document Conversion
     * @param document - The document to convert (max 10 MB)
     * @param targetFormat - Target format: "PDF", "DOCX", or "TXT"
     * @param quality - Quality level: "Low", "Medium", or "High"
     * @return ConversionResult containing the converted document
     */
    ConversionResult convertDocument(byte[] document, String targetFormat, String quality);
    
    /**
     * Document Compression
     * @param document - The document to compress (max 20 MB)
     * @param compressionType - Compression type: "ZIP" or "RAR"
     * @return CompressionResult containing the compressed document
     */
    CompressionResult compressDocument(byte[] document, String compressionType);
}

// Result classes
class ConversionResult {
    byte[] convertedDocument;
    String format;
    String quality;
}

class CompressionResult {
    byte[] compressedDocument;
    String compressionType;
}

Question III.2 (10 points) - Explanation of the second parameter

The second parameter documentProcessingStub is a callback function that receives the result of the client creation.
In the standard soap.createClient() callback pattern, this callback actually receives two parameters:

err - An error object (if an error occurred during client creation)
client - The SOAP client object with methods to call the services (convertDocument, compressDocument)

However, as written in the question, documentProcessingStub represents the client object that will be passed to the callback, allowing you to call the SOAP service methods like documentProcessingStub.convertDocument() and documentProcessingStub.compressDocument().

Question III.3 (15 points) - Callback code

callback.js

Question III.4 (20 points) - Promise-based code (without async/await)

promises.js

Question III.5 (15 points) - Code with async/await

asyncawait.js

Question III.6 (30 points) - Split document with Promise.all

promises.js