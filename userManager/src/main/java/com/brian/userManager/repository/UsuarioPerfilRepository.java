package com.brian.userManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brian.userManager.model.UsuarioPerfil;

@Repository
public interface UsuarioPerfilRepository extends JpaRepository<UsuarioPerfil,Integer>{

}
