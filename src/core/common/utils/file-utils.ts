/**
 * Collection of utility methods related to files.
 */
export class FileUtils {
    /**
     * Convert a file into a base 64 string.
     * @param file The file to convert.
     */
    public static async toBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }
}
