package Persistence.Entity;

import Domain.Enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Entity
@Table(name = "person")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonEntity {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Length(min = 10)
    @Column(name = "phone_number")
    private String phoneNumber;

    @NotBlank
    @Column(name = "license_plate")
    private String LicensePlate;

    @NotBlank
    @NotNull
    @Column(name = "role")
    private Role role;
}
