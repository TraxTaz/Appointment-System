package Business.PersonInterface;

import Domain.PersonRR.PersonRequest;
import Domain.PersonRR.PersonResponse;

public interface CreatePersonUseCase {
    PersonResponse createPerson(PersonRequest request);
}
