package pl.coderslab.charity.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.coderslab.charity.model.Role;
import pl.coderslab.charity.model.User;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
