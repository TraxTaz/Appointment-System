package Controller;


import Business.PersonInterface.CreatePersonUseCase;
import Domain.PersonRR.PersonRequest;
import Domain.PersonRR.PersonResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/people")
@AllArgsConstructor
public class PersonController {

    private final CreatePersonUseCase createPersonUseCase;


    @PostMapping
    public ResponseEntity<PersonResponse> createPerson(@RequestBody @Valid PersonRequest request){
        PersonResponse response = createPersonUseCase.createPerson(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
