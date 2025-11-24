

const ConvertTosBase64Handle = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {

        return reader.result;
    }
}
export default ConvertTosBase64Handle;