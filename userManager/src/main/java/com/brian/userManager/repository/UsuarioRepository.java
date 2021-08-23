package com.brian.userManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brian.userManager.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {

}
