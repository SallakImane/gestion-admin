package com.admin.apigestion.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AbstractEntity implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false, nullable = false)
    protected Long id;
    @Version
    @Column(nullable = false)
    private Long version;
    @Column(name = "last_update", nullable = false)
    private LocalDateTime lastUpdate;
    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;
    @Column(nullable = false)
    private Integer status;

    @PrePersist
    void preInsert() {
        lastUpdate = LocalDateTime.now();
        creationDate = LocalDateTime.now();
        if (status == null)
            status = 1;
    }

    @PreUpdate
    void preUpdate() {
        lastUpdate = LocalDateTime.now();
    }
}
