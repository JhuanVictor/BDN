package com.bdn.bdnapi.bdnapi.service;

import com.bdn.bdnapi.bdnapi.model.Lista;
import com.bdn.bdnapi.bdnapi.repository.ListaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class ListaService {

    @Autowired
    private ListaRepository listaRepository;

    public Lista atualizar (Long codigo, Lista lista){
        Lista listaSalva = buscarPeloCodigo(codigo);
        BeanUtils.copyProperties(lista, listaSalva,"codigo");
        return listaRepository.save(listaSalva);
    }

    public Lista buscarPeloCodigo (Long codigo) {
        Lista listaSalva = listaRepository.findById(codigo)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Lista %d", codigo)));
        if (listaSalva == null) {
            throw new EmptyResultDataAccessException(1);
        }
        return listaSalva;
    }
}
