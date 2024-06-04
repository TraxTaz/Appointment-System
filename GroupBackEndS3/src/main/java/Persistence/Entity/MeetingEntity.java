package Persistence.Entity;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.Date;
import java.util.List;

public class MeetingEntity {
    public Long id;
    public String title;
    public Date startDate;
    public Date endDate;
    @ManyToMany
    public List<PersonEntity> people;
}
