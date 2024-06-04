package Business.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PersonExistsException extends ResponseStatusException {
    public  PersonExistsException(String error) {super (HttpStatus.BAD_REQUEST, error); }
}
