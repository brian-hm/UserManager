package com.brian.userManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brian.userManager.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa,Integer> {

}
