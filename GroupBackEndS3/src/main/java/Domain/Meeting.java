package Domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;


@AllArgsConstructor
@Data
@Builder
public class Meeting {

    @NotNull
    private Long id;

    @NotBlank
    private String title;

    @NotEmpty
    @NotNull
    private List<Person> persons;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}