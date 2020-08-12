package internetapllication.backend;

import java.util.List;

import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.repository.query.Param;

public interface SeasonRepository extends JpaRepository<Season, Integer>{
	
	@Query(value="SELECT * FROM season s WHERE s.Year=:year", nativeQuery = true)
	List<Season> findAll(@Param("year") Integer year,Pageable page);
	
	@Query(value="SELECT * FROM season s WHERE s.Year=:year AND s.Pos='PF' ", nativeQuery = true)
	List<Season> findByPF(@Param("year") Integer year,Pageable page);

	@Query(value="SELECT * FROM season s WHERE s.Year=:year AND s.Pos='C' ", nativeQuery = true)
	List<Season> findByC(@Param("year") Integer year,Pageable page);
	
	@Query(value="SELECT * FROM season s WHERE s.Year=:year AND s.Pos='SG' ", nativeQuery = true)
	List<Season> findBySG(@Param("year") Integer year,Pageable page);
	
	@Query(value="SELECT * FROM season s WHERE s.Year=:year AND s.Pos='PG' ", nativeQuery = true)
	List<Season> findByPG(@Param("year") Integer year,Pageable page);
	
	@Query(value="SELECT * FROM season s WHERE s.Year=:year AND s.Pos='F' ", nativeQuery = true)
	List<Season> findByF(@Param("year") Integer year,Pageable page);
	
}
