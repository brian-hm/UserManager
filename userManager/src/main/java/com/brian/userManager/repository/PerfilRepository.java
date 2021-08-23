package com.brian.userManager.repository;


import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brian.userManager.model.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil,Integer>{
	public List<Perfil> findAll(Sort sort);
}
