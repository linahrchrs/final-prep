package finalprep.P3.finalexam;

public interface APIdef {
    
    /**
     * Document conversion functionality (DC)
     * @param doc_to_convert  the document to be converted, limited to 10MB
     * @param target_format   the target format of the doc (PDF, DOCX, TXT)
     * @param quality_lvl     the quality level of the conversion( High, Medium, Low)
     * @return                The converted document in the specified format with the specified quality
     */

    byte[] convertDoc(byte[] doc_to_convert, String target_format, String quality_lvl);

    /**
     * Document Compression functionality (DCM)
     * @param doc_to_compress the document to be compressed, limited to 20MB
     * @param compression_type the type of the compression (ZIP, RAR)
     * @return                compressed doc in the specofied format
     */

    byte[] compressDoc(byte[] doc_to_compress, String compression_type);
}
