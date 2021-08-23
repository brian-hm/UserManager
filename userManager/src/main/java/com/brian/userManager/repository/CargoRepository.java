package com.brian.userManager.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brian.userManager.model.Cargo;
import com.brian.userManager.model.Perfil;

@Repository
public interface CargoRepository extends JpaRepository<Cargo,Integer>{
	public List<Cargo> findAll(Sort sort);
}
