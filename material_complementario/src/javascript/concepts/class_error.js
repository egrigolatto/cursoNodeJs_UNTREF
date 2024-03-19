class ErrorPersonalizado extends Error {

    constructor(message) {
        super(message);

        this.name = "Error Personalizado";
        this.status = "Error";
    }

    getError() {
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    }
}

try {
    let dividiendo = 10;
    let divisor = 0;

    if (divisor !== 0) {
        console.log(dividiendo / divisor);
    } else {
        // Lanza el Error Personalizado
        throw new ErrorPersonalizado("No se puede dividir por cero");
    }
} catch (error) {
    console.error(error.getError());
}