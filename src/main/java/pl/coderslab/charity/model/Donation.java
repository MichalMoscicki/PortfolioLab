package pl.coderslab.charity.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Integer quantity;
    @NotNull
    @OneToMany
    private List<Category> categories;
    @OneToOne
    private Institution institution;
    @NotNull
    private String street;
    @NotNull
    private String City;
    @NotNull
    private String zipCode;
    @NotNull
    private  String phone;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUpDate;
    @NotNull
    private LocalTime pickUpTime;
    private String pickUpComment;
}
