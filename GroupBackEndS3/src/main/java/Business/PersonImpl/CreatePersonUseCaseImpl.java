package Business.PersonImpl;

import Business.Exceptions.PersonExistsException;
import Business.PersonInterface.CreatePersonUseCase;
import Domain.Enums.Role;
import Domain.PersonRR.PersonRequest;
import Domain.PersonRR.PersonResponse;
import Persistence.Entity.PersonEntity;
import Persistence.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
public class CreatePersonUseCaseImpl implements CreatePersonUseCase {
    private PersonRepository personRepository;


    @Transactional
    @Override
    public PersonResponse createPerson(PersonRequest request){
        if (personRepository.existsByPhoneNumber(request.getPhoneNumber())){
            throw new PersonExistsException("Phone number already exists");
        }

        if (personRepository.existsByLicensePlate(request.getLicensePlate())){
            throw new PersonExistsException("License plate is already registered by another person");
        }

        PersonEntity personEntity = savePerson(request);

        return PersonResponse.builder()
                .id(personEntity.getId())
                .build();

    }

    private PersonEntity savePerson(PersonRequest request){

        PersonEntity newPerson = PersonEntity.builder()
                .name(request.getName())
                .role(request.getRole())
                .phoneNumber(request.getPhoneNumber())
                .LicensePlate(request.getLicensePlate())
                .build();

        personRepository.save(newPerson);

        return newPerson;
    }
}
