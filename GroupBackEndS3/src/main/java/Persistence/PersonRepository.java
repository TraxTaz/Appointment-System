package Persistence;

import Persistence.Entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<PersonEntity, Long> {
    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByLicensePlate(String licensePlate);
}
