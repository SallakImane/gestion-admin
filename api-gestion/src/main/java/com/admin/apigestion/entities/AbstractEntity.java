package com.admin.apigestion.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
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
    @Column(nullable = false)
    private Integer status;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(nullable = false)
    private String modifiedBy;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;



//    @Column(name = "last_update", nullable = false)
//    private LocalDateTime lastUpdate;
//    @Column(name = "creation_date", nullable = false)
//    private LocalDateTime creationDate;
//    @PrePersist
//    void preInsert() {
//        lastUpdate = LocalDateTime.now();
//        creationDate = LocalDateTime.now();
//        if (status == null)
//            status = 1;
//    }
//
//    @PreUpdate
//    void preUpdate() {
//        lastUpdate = LocalDateTime.now();
//    }
}
